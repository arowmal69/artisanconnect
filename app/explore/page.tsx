import { createClient } from '@/lib/supabase/server';
import ExploreClient from './ExploreClient';
import { MOCK_PROFILES } from '@/lib/mock-data';

export default async function ExplorePage() {
  const supabase = await createClient();

  // Fetch all profiles from Supabase if available
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  // Use database profiles if present, otherwise default to rich mock creative freelancers
  const displayedProfiles = profiles && profiles.length > 0 ? profiles : MOCK_PROFILES;

  return <ExploreClient initialProfiles={displayedProfiles} />;
}
