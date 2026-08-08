import { createClient } from '@/lib/supabase/server';
import ProfileClient from './ProfileClient';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  // Fetch the profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single();

  if (profileError || !profile) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        <p>Artist not found.</p>
      </div>
    );
  }

  // Fetch their portfolio posts
  const { data: posts, error: postsError } = await supabase
    .from('portfolio_posts')
    .select('*')
    .eq('user_id', params.id)
    .order('created_at', { ascending: false });

  return <ProfileClient artist={profile} initialPosts={posts || []} />;
}
