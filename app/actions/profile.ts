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
  const portfolioUrl = formData.get('portfolio_url') as string
  const skillsStr = (formData.get('skills') as string) || (formData.get('specialties') as string)

  const skills = skillsStr ? skillsStr.split(',').map(s => s.trim()).filter(Boolean) : []

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      bio,
      portfolio_url: portfolioUrl,
      skills,
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
