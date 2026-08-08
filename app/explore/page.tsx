import { createClient } from '@/lib/supabase/server';
import ExploreClient from './ExploreClient';

export default async function ExplorePage() {
  const supabase = await createClient();

  // Fetch all profiles
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching profiles:', error);
  }

  return <ExploreClient initialProfiles={profiles || []} />;
}
