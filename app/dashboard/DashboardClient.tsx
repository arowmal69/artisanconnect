'use client';

import React from 'react';
import { ChevronRight, ShoppingBag, PlusCircle, Star, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { Profile, Order, Service } from '@/lib/types';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface DashboardClientProps {
  profile: Profile;
  activeOrders: Order[];
  recommendedServices: Service[];
}

export default function DashboardClient({ profile, activeOrders, recommendedServices }: DashboardClientProps) {

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: 'badge-pending',
      active: 'badge-active',
      delivered: 'badge-delivered',
      completed: 'badge-completed',
      cancelled: 'badge-cancelled',
    };
    return map[status] || 'badge-active';
  };

  const stats = [
    { label: 'Active Orders', value: activeOrders.filter(o => o.status === 'active').length, icon: TrendingUp, color: 'text-violet-400' },
    { label: 'Total Orders', value: activeOrders.length, icon: ShoppingBag, color: 'text-indigo-400' },
    { label: 'Completed', value: activeOrders.filter(o => o.status === 'completed').length, icon: Star, color: 'text-amber-400' },
  ];

  return (
    <main className="min-h-screen" style={{ background: '#0a0a0f' }}>
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-violet" style={{ width: 500, height: 500, top: '-10%', right: '-5%', opacity: 0.15 }} />
        <div className="orb orb-indigo" style={{ width: 300, height: 300, bottom: '10%', left: '-5%', opacity: 0.1 }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-10 flex items-start justify-between animate-fade-in">
          <div>
            <div className="inline-flex items-center gap-2 glass-violet rounded-full px-3 py-1.5 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-bold text-violet-300">Creative Dashboard</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-1">
              Welcome back, {profile.full_name?.split(' ')[0] || profile.username}
            </h1>
            <p className="text-slate-400 text-sm">Manage your active commissions, orders, and creative profile</p>
          </div>
          <Link href="/explore">
            <button className="btn-gradient px-5 py-2.5 text-sm font-bold text-white rounded-xl flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Find Freelancers
            </button>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-10 animate-fade-in animate-delay-100">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl glass-violet flex items-center justify-center shrink-0">
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-slate-500 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ===== LEFT: PROFILE ===== */}
          <div className="lg:col-span-3 space-y-5 animate-slide-in-left">
            <h2 className="text-lg font-black text-white tracking-tight">Your Profile</h2>

            <div className="glass rounded-3xl p-6 flex flex-col items-center text-center">
              {/* Avatar with glow */}
              <div className="relative mb-5">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 opacity-30 blur-xl scale-125" />
                <img
                  src={profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.username}`}
                  alt={profile.full_name || profile.username}
                  className="relative h-24 w-24 rounded-full object-cover ring-2 ring-violet-500/30"
                />
              </div>

              <h3 className="text-lg font-black text-white">{profile.full_name || profile.username}</h3>
              <span
                className="mt-2 mb-4 px-3 py-1 text-xs font-bold rounded-full capitalize"
                style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}
              >
                {profile.role || 'User'}
              </span>

              <p className="text-sm text-slate-400 leading-relaxed mb-6 px-2">
                {profile.bio || 'Welcome to ArtisanConnect! Complete your profile to start hiring and getting hired.'}
              </p>

              <div className="w-full" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 text-left">Specialties</span>
                <div className="flex flex-wrap gap-2">
                  {(profile.skills || []).length > 0 ? (
                    (profile.skills || []).slice(0, 4).map((skill: string) => (
                      <span
                        key={skill}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-violet-300"
                        style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No specialties added yet</span>
                  )}
                </div>
              </div>
            </div>

            <Link href="/messages">
              <div className="card-hover glass rounded-2xl p-4 flex items-center justify-between cursor-pointer">
                <span className="text-sm font-bold text-white">Messages & Inquiries</span>
                <ChevronRight className="h-4 w-4 text-violet-400" />
              </div>
            </Link>
          </div>

          {/* ===== MIDDLE: ORDERS ===== */}
          <div className="lg:col-span-6 space-y-5 animate-fade-in animate-delay-200">
            <h2 className="text-lg font-black text-white tracking-tight">Active Orders</h2>

            {activeOrders.length === 0 ? (
              <div className="glass rounded-3xl p-14 flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-2xl glass-violet flex items-center justify-center mb-4">
                  <ShoppingBag className="h-8 w-8 text-violet-400" />
                </div>
                <h4 className="text-lg font-black text-white mb-2">No active orders</h4>
                <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
                  You don't have any active commission orders yet. Discover talented freelancers to get started.
                </p>
                <Link href="/explore">
                  <button className="btn-gradient px-6 py-2.5 text-sm font-bold text-white rounded-xl">
                    Explore Services
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {activeOrders.map((order) => {
                  const isBuyer = order.buyer_id === profile.id;
                  const partner = isBuyer ? order.seller : order.buyer;
                  const roleLabel = isBuyer ? 'Hiring' : 'Client';

                  return (
                    <div
                      key={order.id}
                      className="card-hover glass rounded-3xl p-6 flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-5">
                        <div className="flex items-center gap-3">
                          <div className="glass-violet h-12 w-12 rounded-2xl flex items-center justify-center shrink-0">
                            <ShoppingBag className="h-5 w-5 text-violet-400" />
                          </div>
                          <div>
                            <h3 className="font-black text-white line-clamp-1">{order.service?.title || 'Custom Order'}</h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {roleLabel}: <span className="font-semibold text-slate-300">{partner?.full_name || partner?.username || 'User'}</span>
                            </p>
                          </div>
                        </div>
                        <span className={`${getStatusBadge(order.status)} text-xs font-bold px-3 py-1.5 rounded-full capitalize`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="glass rounded-2xl p-4 flex items-center justify-between mb-4">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Amount</p>
                          <p className="font-black text-white text-xl">${order.amount}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Started</p>
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-300">
                            <Clock className="h-3.5 w-3.5 text-slate-500" />
                            {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Link href={`/orders/${order.id}`}>
                          <button className="btn-gradient px-6 py-2.5 text-sm font-bold text-white rounded-xl flex items-center gap-2">
                            Open Workspace <ChevronRight className="h-4 w-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ===== RIGHT: RECOMMENDED ===== */}
          <div className="lg:col-span-3 space-y-5 animate-fade-in animate-delay-300">
            <h2 className="text-lg font-black text-white tracking-tight">Recommended</h2>

            <div className="space-y-4">
              {recommendedServices.length > 0 ? recommendedServices.map((service, i) => (
                <Link key={service.id} href={`/services/${service.id}`} className="block">
                  <div className="card-hover glass rounded-2xl overflow-hidden group">
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={service.image_url || `https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80`}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.8) 0%, transparent 60%)' }} />
                      {service.category && (
                        <div className="absolute top-2 left-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(124,58,237,0.8)', color: 'white' }}>
                            {service.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={service.seller?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${service.seller?.username}`}
                          alt={service.seller?.username}
                          className="h-5 w-5 rounded-full object-cover ring-1 ring-violet-500/30"
                        />
                        <span className="text-xs font-semibold text-slate-400">{service.seller?.full_name || service.seller?.username}</span>
                      </div>
                      <h4 className="text-sm font-black text-white line-clamp-2 group-hover:text-violet-300 transition-colors mb-2">
                        {service.title}
                      </h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-amber-300">5.0</span>
                        <span className="text-xs text-slate-500 ml-1">(Top Rated)</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )) : (
                <div className="glass rounded-2xl p-6 text-center">
                  <p className="text-sm text-slate-400">No recommendations right now.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
