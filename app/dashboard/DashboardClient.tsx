'use client';

import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Search, LayoutDashboard, ShoppingBag, PlusCircle, Star } from 'lucide-react';
import { Profile, Order, Service } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface DashboardClientProps {
  profile: Profile;
  activeOrders: Order[];
  recommendedServices: Service[];
}

export default function DashboardClient({ profile, activeOrders, recommendedServices }: DashboardClientProps) {

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 h-full bg-slate-50 min-h-screen">
      
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <Link href="/explore">
           <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm font-semibold rounded-xl">
             <PlusCircle className="h-4 w-4 mr-2" /> Find Services
           </Button>
        </Link>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Your Profile</h2>
          
          {/* Profile Card */}
          <div className="rounded-2xl bg-white p-6 border border-slate-200 flex flex-col items-center text-center shadow-sm">
            <img
              src={profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.email}`}
              alt={profile.full_name || profile.username}
              className="h-24 w-24 rounded-full object-cover mb-4 ring-2 ring-indigo-50"
            />
            <h3 className="text-lg font-bold text-slate-900">{profile.full_name || profile.username}</h3>
            <Badge variant="secondary" className="mt-1">{profile.role || 'User'}</Badge>
            <p className="text-sm text-slate-500 mt-3 mb-6 px-2 leading-relaxed">
              {profile.bio || "Welcome to SkillExchange! Complete your profile to start buying and selling."}
            </p>

            <div className="w-full space-y-3 text-left">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {(profile.skills || []).length > 0 ? (
                     (profile.skills || []).slice(0, 3).map((skill: string) => (
                      <Badge key={skill} variant="outline" className="bg-slate-50 font-semibold">{skill}</Badge>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No skills added yet</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MIDDLE COLUMN ================= */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Active Orders</h2>

          <div className="space-y-4">
            {activeOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                 <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                   <ShoppingBag className="h-8 w-8 text-slate-400" />
                 </div>
                 <h4 className="text-lg font-bold text-slate-900">No active orders</h4>
                 <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">You don't have any orders yet. Discover talented freelancers and get your project started.</p>
                 <Link href="/explore" className="mt-6">
                    <Button variant="outline" className="font-semibold rounded-xl">Explore Services</Button>
                 </Link>
              </div>
            ) : (
              activeOrders.map((order) => {
                const isBuyer = order.buyer_id === profile.id;
                const partner = isBuyer ? order.seller : order.buyer;
                const roleLabel = isBuyer ? 'Buying from' : 'Selling to';
                
                return (
                  <div key={order.id} className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col shadow-sm hover:border-indigo-200 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex items-center gap-3">
                         <div className="bg-indigo-50 p-3 rounded-xl">
                            <LayoutDashboard className="h-5 w-5 text-indigo-600" />
                         </div>
                         <div>
                           <h3 className="font-bold text-slate-900 line-clamp-1">{order.service?.title || 'Custom Order'}</h3>
                           <p className="text-sm text-slate-500">
                             {roleLabel} <span className="font-semibold text-slate-700">{partner?.full_name || partner?.username || 'User'}</span>
                           </p>
                         </div>
                       </div>
                       <Badge variant="outline" className={`${getStatusColor(order.status)} font-bold capitalize px-3 py-1`}>
                         {order.status}
                       </Badge>
                    </div>
                    
                    <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between mt-2">
                       <div>
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</p>
                         <p className="font-bold text-slate-900 text-lg">${order.amount}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Started</p>
                         <p className="font-semibold text-slate-700 text-sm">
                           {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                         </p>
                       </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end gap-3">
                       <Link href={`/orders/${order.id}`}>
                         <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-semibold px-6">
                           Open Workspace <ChevronRight className="h-4 w-4 ml-1" />
                         </Button>
                       </Link>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-6">Recommended Services</h2>
          
          <div className="space-y-4">
            {recommendedServices.length > 0 ? recommendedServices.map((service, i) => (
              <Link key={service.id} href={`/services/${service.id}`} className="block">
                <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group">
                  <div className="h-32 bg-slate-100 overflow-hidden relative">
                     {service.image_url ? (
                       <img src={service.image_url} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                     ) : (
                       <img src={`https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80&random=${i}`} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                     )}
                     <div className="absolute top-2 left-2">
                       <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm shadow-sm">{service.category}</Badge>
                     </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={service.seller?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${service.seller?.username}`} alt={service.seller?.username} className="h-5 w-5 rounded-full object-cover" />
                      <span className="text-xs font-semibold text-slate-600">{service.seller?.full_name || service.seller?.username}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">{service.title}</h4>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                       <Star className="h-3 w-3 fill-current" /> 5.0
                       <span className="text-slate-400 font-medium ml-1">(New)</span>
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <p className="text-sm text-slate-500 bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm">No recommendations right now.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
