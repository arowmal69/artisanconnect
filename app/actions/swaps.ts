'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createSwapRequest(targetUserId: string, offeredSkill: string, requestedSkill: string, message: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  if (user.id === targetUserId) {
    return { error: 'You cannot swap with yourself' }
  }

  const { data: swapData, error: swapError } = await supabase
    .from('skill_swap_requests')
    .insert({
      sender_id: user.id,
      receiver_id: targetUserId,
      offered_skill: offeredSkill,
      requested_skill: requestedSkill,
      status: 'pending'
    })
    .select('id')
    .single()

  if (swapError) {
    return { error: swapError.message }
  }

  if (message && swapData?.id) {
    await supabase.from('messages').insert({
      swap_id: swapData.id,
      sender_id: user.id,
      receiver_id: targetUserId,
      content: message
    })
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateSwapRequestStatus(swapId: string, status: 'accepted' | 'declined') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Only receiver can update status
  const { error } = await supabase
    .from('skill_swap_requests')
    .update({ status })
    .eq('id', swapId)
    .eq('receiver_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
