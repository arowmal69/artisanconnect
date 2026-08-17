export interface Profile {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  avatar_url: string;
  portfolio_url?: string;
  role: 'buyer' | 'seller' | 'both';
  skills_offered: string[]; // freelancer's skills / specialties
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  pricing_tier: Record<string, any>; // JSONB
  delivery_days: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
  seller?: Profile;
}

export interface Order {
  id: string;
  buyer_id: string;
  seller_id: string;
  service_id: string;
  status: 'pending' | 'active' | 'delivered' | 'completed' | 'cancelled';
  amount: number;
  requirements?: string;
  created_at: string;
  updated_at: string;
  buyer?: Profile;
  seller?: Profile;
  service?: Service;
}

export interface Message {
  id: string;
  order_id?: string;
  sender_id: string;
  receiver_id?: string;
  content: string;
  file_url?: string;
  created_at: string;
  sender?: Profile;
}

export interface Review {
  id: string;
  order_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  feedback?: string;
  created_at: string;
  reviewer?: Profile;
}

export interface PortfolioPost {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_url: string;
  tags?: string[];
  created_at: string;
  user?: Profile;
}
