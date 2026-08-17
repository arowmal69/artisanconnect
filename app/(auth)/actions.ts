'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    if (error.message.toLowerCase().includes('email not confirmed')) {
      return { 
        error: 'Email not confirmed. Please check your inbox for the verification link, or disable "Confirm email" in your Supabase Auth settings for local testing.' 
      }
    }
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const skillsOfferedRaw = formData.get('skills') as string
  const skills_offered = skillsOfferedRaw ? skillsOfferedRaw.split(',').map(s => s.trim()).filter(Boolean) : []
  const role = (formData.get('role') as string) || 'seller'
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const avatarFile = formData.get('avatar') as File | null

  const data = {
    email,
    password,
    options: {
      data: {
        full_name: formData.get('full_name') as string,
        username: formData.get('username') as string,
        bio: formData.get('bio') as string,
        portfolio_url: formData.get('portfolio_url') as string,
        role: role,
        skills_offered: role === 'seller' ? skills_offered : [],
      }
    }
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  // Upload avatar if provided
  if (authData.user && avatarFile && avatarFile.size > 0) {
    const fileExt = avatarFile.name.split('.').pop()
    const filePath = `${authData.user.id}/avatar.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile, { upsert: true })

    if (!uploadError && uploadData) {
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // Update the profile row with the avatar URL
      await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', authData.user.id)
    }
  }

  // If email confirmation is enabled in Supabase, session will be null
  if (authData.user && !authData.session) {
    return { 
      success: true, 
      emailConfirmationRequired: true,
      email: email 
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
