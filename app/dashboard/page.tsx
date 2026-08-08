import { createClient } from '@/lib/supabase/server';
import DashboardClient from './DashboardClient';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch the user's profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch active orders where user is buyer or seller
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      buyer:buyer_id(id, username, full_name, avatar_url),
      seller:seller_id(id, username, full_name, avatar_url),
      service:service_id(id, title, category, image_url)
    `)
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
    .order('created_at', { ascending: false });

  // Fetch recommended services (other sellers' services)
  const { data: recommendedServices } = await supabase
    .from('services')
    .select(`
      *,
      seller:seller_id(id, username, full_name, avatar_url)
    `)
    .neq('seller_id', user.id)
    .limit(3);

  return (
    <DashboardClient 
      profile={profile || { id: user.id, username: user.email?.split('@')[0] || 'User', full_name: '', avatar_url: '', role: 'buyer', skills: [] }} 
      activeOrders={orders || []} 
      recommendedServices={recommendedServices || []}
    />
  );
}
