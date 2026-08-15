import { createClient } from '@/lib/supabase/server';
import ProfileClient from './ProfileClient';
import { MOCK_PROFILES, MOCK_POSTS } from '@/lib/mock-data';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  // Try fetching from database
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single();

  const { data: posts } = await supabase
    .from('portfolio_posts')
    .select('*')
    .eq('user_id', params.id)
    .order('created_at', { ascending: false });

  // Fallback to mock profiles by ID or index
  const fallbackArtist = 
    MOCK_PROFILES.find((p) => p.id === params.id) || 
    (params.id === '1' ? MOCK_PROFILES[0] : MOCK_PROFILES[0]);

  const displayedProfile = profile || fallbackArtist;
  const displayedPosts = posts && posts.length > 0 ? posts : MOCK_POSTS.filter(p => p.user_id === displayedProfile.id || p.user?.id === displayedProfile.id);

  return <ProfileClient artist={displayedProfile} initialPosts={displayedPosts.length > 0 ? displayedPosts : MOCK_POSTS.slice(0, 3)} />;
}
