import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import MessagesClient from './MessagesClient';

export default async function MessagesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch the current user's profile
  const { data: currentProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch all messages where current user is sender or receiver
  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order('created_at', { ascending: true });

  // Get unique conversation partner IDs
  const partnerIds = [...new Set(
    (messages || []).map((m) =>
      m.sender_id === user.id ? m.receiver_id : m.sender_id
    )
  )].filter(Boolean);

  // Fetch partner profiles
  const { data: partnerProfiles } = partnerIds.length > 0
    ? await supabase.from('profiles').select('*').in('id', partnerIds)
    : { data: [] };

  return (
    <MessagesClient
      currentProfile={currentProfile || { id: user.id, username: user.email?.split('@')[0] || 'User', full_name: '', avatar_url: '', role: 'buyer', skills_offered: [], bio: '', created_at: '', updated_at: '' }}
      initialMessages={messages || []}
      partnerProfiles={partnerProfiles || []}
    />
  );
}
