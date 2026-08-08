'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function uploadPortfolioPost(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Not authenticated' }
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const tagsString = formData.get('tags') as string
  const file = formData.get('image') as File | null

  if (!title || !file || file.size === 0) {
    return { error: 'Title and Image are required.' }
  }

  const tags = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : []

  // Upload image
  const fileExt = file.name.split('.').pop()
  const fileName = `${user.id}/${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('portfolio-images')
    .upload(fileName, file)

  if (uploadError) {
    return { error: uploadError.message }
  }

  const { data: urlData } = supabase.storage
    .from('portfolio-images')
    .getPublicUrl(uploadData.path)

  const imageUrl = urlData.publicUrl

  // Insert into DB
  const { error: dbError } = await supabase
    .from('portfolio_posts')
    .insert({
      user_id: user.id,
      title,
      description,
      image_url: imageUrl,
      tags
    })

  if (dbError) {
    return { error: dbError.message }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/profile/${user.id}`)
  return { success: true }
}

export async function getPortfolioPosts(userId?: string) {
  const supabase = await createClient()

  let query = supabase
    .from('portfolio_posts')
    .select('*, profiles(*)')
    .order('created_at', { ascending: false })

  if (userId) {
    query = query.eq('user_id', userId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching portfolio posts:', error)
    return []
  }

  return data
}
