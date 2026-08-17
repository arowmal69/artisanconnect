import { createClient } from '@/lib/supabase/server';
import ExploreClient from './ExploreClient';
import { MOCK_PROFILES } from '@/lib/mock-data';

export default async function ExplorePage() {
  const supabase = await createClient();

  // Get the currently logged-in user
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch all profiles from Supabase, excluding the current user so they don't see themselves as a provider
  let query = supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (user) {
    query = query.neq('id', user.id);
  }

  const { data: profiles } = await query;

  // Use database profiles if present, otherwise default to mock data
  const displayedProfiles = profiles && profiles.length > 0 ? profiles : MOCK_PROFILES;

  return <ExploreClient initialProfiles={displayedProfiles} />;
}
