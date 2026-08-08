'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const fullName = formData.get('full_name') as string
  const bio = formData.get('bio') as string
  const skillsOfferedStr = formData.get('skills_offered') as string
  const skillsWantedStr = formData.get('skills_wanted') as string

  const skills_offered = skillsOfferedStr ? skillsOfferedStr.split(',').map(s => s.trim()).filter(Boolean) : []
  const skills_wanted = skillsWantedStr ? skillsWantedStr.split(',').map(s => s.trim()).filter(Boolean) : []

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      bio,
      skills_offered,
      skills_wanted,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/profile/${user.id}`)
  return { success: true }
}
