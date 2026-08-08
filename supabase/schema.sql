-- =============================================================================
-- SkillExchange - Database Architecture & Migration Script
-- Target: PostgreSQL / Supabase
-- Author: Principal Database Architect
-- =============================================================================

BEGIN;

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;

-- 2. TABLES & CONSTRAINTS
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.skill_swap_requests CASCADE;
DROP TABLE IF EXISTS public.portfolio_posts CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 2.1 Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username      TEXT UNIQUE NOT NULL,
    full_name     TEXT,
    bio           TEXT,
    avatar_url    TEXT,
    portfolio_url TEXT,
    role          TEXT NOT NULL DEFAULT 'both' CHECK (role IN ('buyer', 'seller', 'both')),
    skills        TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    created_at    TIMESTAMPTZ DEFAULT clock_timestamp() NOT NULL,
    updated_at    TIMESTAMPTZ DEFAULT clock_timestamp() NOT NULL
);

-- 2.2 Services Table (Gigs)
CREATE TABLE IF NOT EXISTS public.services (
    id            UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    seller_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title         TEXT NOT NULL,
    description   TEXT NOT NULL,
    category      TEXT NOT NULL,
    tags          TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    pricing_tier  JSONB NOT NULL DEFAULT '{}'::JSONB,
    delivery_days INTEGER NOT NULL DEFAULT 1,
    image_url     TEXT,
    created_at    TIMESTAMPTZ DEFAULT clock_timestamp() NOT NULL,
    updated_at    TIMESTAMPTZ DEFAULT clock_timestamp() NOT NULL
);

-- 2.3 Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id          UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    buyer_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    seller_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    service_id  UUID NOT NULL REFERENCES public.services(id) ON DELETE RESTRICT,
    status      TEXT NOT NULL DEFAULT 'pending' 
                CHECK (status IN ('pending', 'active', 'delivered', 'completed', 'cancelled')),
    amount      NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    requirements TEXT,
    created_at  TIMESTAMPTZ DEFAULT clock_timestamp() NOT NULL,
    updated_at  TIMESTAMPTZ DEFAULT clock_timestamp() NOT NULL
);

-- 2.4 Messages Table (Chat Workspace)
CREATE TABLE IF NOT EXISTS public.messages (
    id          UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    order_id    UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    sender_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content     TEXT NOT NULL,
    file_url    TEXT,
    created_at  TIMESTAMPTZ DEFAULT clock_timestamp() NOT NULL
);

-- 2.5 Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id          UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    order_id    UUID UNIQUE NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback    TEXT,
    created_at  TIMESTAMPTZ DEFAULT clock_timestamp() NOT NULL
);

-- 3. INDEXES FOR OPTIMIZED QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_services_seller_id ON public.services(seller_id);
CREATE INDEX IF NOT EXISTS idx_services_tags ON public.services USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);

CREATE INDEX IF NOT EXISTS idx_orders_buyer ON public.orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller ON public.orders(seller_id);

CREATE INDEX IF NOT EXISTS idx_messages_order_id ON public.messages(order_id);

CREATE INDEX IF NOT EXISTS idx_reviews_order_id ON public.reviews(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee ON public.reviews(reviewee_id);

-- 4. REALTIME ENABLEMENT
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
    ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 5. ROW LEVEL SECURITY (RLS) & POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 5.1 Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone."
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile."
    ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
    ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile."
    ON public.profiles FOR DELETE USING (auth.uid() = id);

-- 5.2 Services Policies
CREATE POLICY "Services are viewable by everyone."
    ON public.services FOR SELECT USING (true);

CREATE POLICY "Sellers can create services."
    ON public.services FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their own services."
    ON public.services FOR UPDATE USING (auth.uid() = seller_id) WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete their own services."
    ON public.services FOR DELETE USING (auth.uid() = seller_id);

-- 5.3 Orders Policies
CREATE POLICY "Participants can view orders."
    ON public.orders FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Buyers can create orders."
    ON public.orders FOR INSERT WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Participants can update orders."
    ON public.orders FOR UPDATE USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- 5.4 Messages Policies
CREATE POLICY "Participants can view messages."
    ON public.messages FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders o
            WHERE o.id = order_id AND (o.buyer_id = auth.uid() OR o.seller_id = auth.uid())
        )
    );

CREATE POLICY "Participants can create messages within a valid order."
    ON public.messages FOR INSERT WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM public.orders o
            WHERE o.id = order_id AND (o.buyer_id = auth.uid() OR o.seller_id = auth.uid())
        )
    );

-- 5.5 Reviews Policies
CREATE POLICY "Reviews are viewable by everyone."
    ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Buyers can leave reviews for completed orders."
    ON public.reviews FOR INSERT WITH CHECK (
        auth.uid() = reviewer_id AND
        EXISTS (
            SELECT 1 FROM public.orders o
            WHERE o.id = order_id AND o.buyer_id = auth.uid() AND o.status = 'completed'
        )
    );

-- 6. AUTOMATION (SIGNUP TRIGGER FUNCTION)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
    INSERT INTO public.profiles (id, username, full_name, avatar_url, bio, portfolio_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', LOWER(SPLIT_PART(NEW.email, '@', 1)) || '_' || SUBSTRING(NEW.id::text FROM 1 FOR 4)),
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
        NEW.raw_user_meta_data->>'bio',
        NEW.raw_user_meta_data->>'portfolio_url'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

COMMIT;
