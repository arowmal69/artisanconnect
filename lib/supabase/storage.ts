import { createClient } from './client';

export async function uploadPortfolioImage(file: File, userId: string): Promise<string> {
  const supabase = createClient();

  // Create unique file path: userId/timestamp_filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('portfolio-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  // Retrieve public URL
  const { data: publicUrlData } = supabase.storage
    .from('portfolio-images')
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
