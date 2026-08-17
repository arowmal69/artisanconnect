'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Sends an initial "hire" inquiry message from the current user to a freelancer.
 * Called when a client clicks "Hire Me" on a profile.
 */
export async function sendHireMessage(freelancerId: string, freelancerName: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Don't send to yourself
  if (user.id === freelancerId) return { error: 'You cannot hire yourself.' };

  const content = `Hi ${freelancerName || 'there'}! I came across your profile and I'm interested in hiring you for a project. Could we discuss further?`;

  const { error } = await supabase.from('messages').insert({
    sender_id: user.id,
    receiver_id: freelancerId,
    content,
  });

  if (error) return { error: error.message };

  return { success: true };
}
