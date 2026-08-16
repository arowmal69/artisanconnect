'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {
  Search, Star, Clock, ChevronRight, TrendingUp, Palette,
  Music, PersonStanding, Camera, CheckCircle, ArrowRight, Sparkles, Shield, Zap
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Illustration & Art', icon: Palette, count: '1,340', color: 'from-violet-500/20 to-purple-600/10', iconColor: 'text-violet-400', glow: 'rgba(124,58,237,0.3)' },
  { name: 'Painting', icon: Palette, count: '876', color: 'from-indigo-500/20 to-blue-600/10', iconColor: 'text-indigo-400', glow: 'rgba(99,102,241,0.3)' },
  { name: 'Music & Singing', icon: Music, count: '1,021', color: 'from-pink-500/20 to-rose-600/10', iconColor: 'text-pink-400', glow: 'rgba(236,72,153,0.3)' },
  { name: 'Dance & Performance', icon: PersonStanding, count: '594', color: 'from-amber-500/20 to-orange-600/10', iconColor: 'text-amber-400', glow: 'rgba(245,158,11,0.3)' },
];

const TRENDING_SERVICES = [
  {
    id: '1',
    title: 'I will create a stunning custom digital portrait illustration',
    seller: { name: 'Maya Rivera', level: 'Top Rated', avatar: 'https://i.pravatar.cc/150?u=artist1' },
    rating: 4.9, reviews: 218, price: 80,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80',
    delivery: 5, category: 'Illustration'
  },
  {
    id: '2',
    title: 'I will paint a custom watercolor portrait or landscape',
    seller: { name: 'Lena Park', level: 'Level 2', avatar: 'https://i.pravatar.cc/150?u=artist2' },
    rating: 5.0, reviews: 142, price: 120,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&q=80',
    delivery: 7, category: 'Painting'
  },
  {
    id: '3',
    title: 'I will record a professional vocal cover or original song',
    seller: { name: 'Aiden Cole', level: 'Top Rated', avatar: 'https://i.pravatar.cc/150?u=artist3' },
    rating: 4.8, reviews: 307, price: 60,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80',
    delivery: 3, category: 'Music'
  },
  {
    id: '4',
    title: 'I will choreograph and record a custom dance performance',
    seller: { name: 'Sofia Diaz', level: 'Level 2', avatar: 'https://i.pravatar.cc/150?u=artist4' },
    rating: 4.7, reviews: 91, price: 150,
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&q=80',
    delivery: 10, category: 'Dance'
  },
];

const TOP_FREELANCERS = [
  { name: 'Maya Rivera', role: 'Digital Illustrator', skills: ['Portraits', 'Character Design', 'Procreate'], rating: 4.9, avatar: 'https://i.pravatar.cc/150?u=artist1', accent: 'from-violet-500 to-purple-600' },
  { name: 'Aiden Cole', role: 'Vocalist & Producer', skills: ['Pop', 'R&B', 'Session Recording'], rating: 5.0, avatar: 'https://i.pravatar.cc/150?u=artist3', accent: 'from-pink-500 to-rose-600' },
  { name: 'Sofia Diaz', role: 'Dancer & Choreographer', skills: ['Contemporary', 'Hip-Hop', 'Wedding Dances'], rating: 4.8, avatar: 'https://i.pravatar.cc/150?u=artist4', accent: 'from-amber-500 to-orange-600' },
];

const TRUST_STATS = [
  { value: '12K+', label: 'Creative Freelancers', icon: Sparkles },
  { value: '98%', label: 'Client Satisfaction', icon: Shield },
  { value: '48h', label: 'Average Response Time', icon: Zap },
];

export default function MarketplaceHome() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      <Navbar />

      {/* ======================== HERO ======================== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0820 50%, #0a0a0f 100%)' }}>
        {/* Floating Orbs */}
        <div className="orb orb-violet animate-orb-1" style={{ width: 500, height: 500, top: '-10%', left: '-8%', opacity: 0.5 }} />
        <div className="orb orb-indigo animate-orb-2" style={{ width: 400, height: 400, top: '20%', right: '-5%', opacity: 0.4 }} />
        <div className="orb orb-pink animate-orb-3" style={{ width: 300, height: 300, bottom: '10%', left: '30%', opacity: 0.3 }} />

        {/* Grid overlay */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 glass-violet rounded-full px-4 py-2 mb-8 animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold text-violet-300">The Creative Freelancer Marketplace</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.0] tracking-tight mb-6 animate-slide-up">
              Hire the perfect{' '}
              <span className="gradient-text-bright">creative talent</span>
              {' '}for your project.
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 font-medium max-w-2xl mb-10 animate-fade-in animate-delay-200 leading-relaxed">
              Connect with talented artists, painters, singers, and dancers. Bring your vision to life with the right creative professional.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl animate-fade-in animate-delay-300">
              <div className="glass-strong rounded-2xl p-2 flex items-center gap-2 hover:border-violet-500/40 transition-all duration-300" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <Search className="h-5 w-5 text-violet-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Try 'portrait painter' or 'live singer for events'..."
                  className="flex-1 bg-transparent border-0 outline-none text-white placeholder-slate-500 text-base py-3 px-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Link href={`/explore${searchQuery ? `?q=${searchQuery}` : ''}`}>
                  <button className="btn-gradient px-6 py-3 text-sm font-bold text-white rounded-xl whitespace-nowrap">
                    Search
                  </button>
                </Link>
              </div>

              {/* Popular Tags */}
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <span className="text-xs text-slate-500 font-medium">Popular:</span>
                {['Illustration', 'Painting', 'Music', 'Dance', 'Murals'].map((tag) => (
                  <button
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-full font-medium text-slate-300 hover:text-white transition-all"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Stats */}
            <div className="flex flex-wrap gap-6 mt-14 animate-fade-in animate-delay-400">
              {TRUST_STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl glass-violet flex items-center justify-center">
                    <Icon className="h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-white">{value}</p>
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #0a0a0f, transparent)' }} />
      </section>

      {/* ======================== CATEGORIES ======================== */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">What we offer</p>
            <h2 className="text-4xl font-black text-white tracking-tight">Explore Categories</h2>
          </div>
          <Link href="/explore">
            <button className="flex items-center gap-1.5 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors">
              View All <ChevronRight className="h-4 w-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => (
            <Link href="/explore" key={cat.name}>
              <div
                className="card-hover glass rounded-2xl p-6 cursor-pointer group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}
                  style={{ boxShadow: `0 0 20px ${cat.glow}` }}
                >
                  <cat.icon className={`h-6 w-6 ${cat.iconColor}`} />
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{cat.name}</h3>
                <p className="text-sm text-slate-500">{cat.count} freelancers available</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ======================== TRENDING SERVICES ======================== */}
      <section className="py-24" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">Hot right now</p>
              <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-violet-400" /> Trending Services
              </h2>
            </div>
            <Link href="/explore">
              <button className="flex items-center gap-1.5 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                View all <ChevronRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRENDING_SERVICES.map((service, i) => (
              <Link href={`/services/${service.id}`} key={service.id}>
                <div className="card-hover glass rounded-2xl overflow-hidden group cursor-pointer h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.2) 50%, transparent 100%)' }} />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: 'rgba(124,58,237,0.8)', color: 'white', backdropFilter: 'blur(8px)' }}>
                        {service.category}
                      </span>
                    </div>
                    {/* Price badge */}
                    <div className="absolute bottom-3 right-3">
                      <span className="text-sm font-black px-3 py-1.5 rounded-xl text-white" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        From ${service.price}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <img src={service.seller.avatar} alt={service.seller.name} className="h-6 w-6 rounded-full object-cover ring-1 ring-violet-500/40" />
                      <span className="text-xs font-semibold text-slate-400">{service.seller.name}</span>
                      <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>
                        {service.seller.level}
                      </span>
                    </div>

                    <h3 className="font-bold text-white leading-snug group-hover:text-violet-300 transition-colors line-clamp-2 flex-1 text-sm">
                      {service.title}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-white">{service.rating}</span>
                        <span className="text-xs text-slate-500">({service.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" /> {service.delivery}d delivery
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== TOP RATED FREELANCERS ======================== */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-3">Hand-picked talent</p>
          <h2 className="text-4xl font-black text-white tracking-tight mb-4">Top-Rated Freelancers</h2>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            Work with the best creative professionals, verified and reviewed by real clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOP_FREELANCERS.map((freelancer, i) => (
            <div
              key={freelancer.name}
              className="card-hover glass rounded-3xl p-8 text-center flex flex-col items-center group"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Avatar with glow ring */}
              <div className="relative mb-5">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${freelancer.accent} opacity-40 blur-xl scale-125 group-hover:opacity-70 transition-opacity`} />
                <img
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  className="relative h-24 w-24 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-violet-500/50 transition-all"
                />
                <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-emerald-500 flex items-center justify-center ring-2 ring-[#0a0a0f]">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>

              <h3 className="font-black text-xl text-white mb-1">{freelancer.name}</h3>
              <p className="text-violet-400 font-semibold text-sm mb-4">{freelancer.role}</p>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-slate-300"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5 glass-violet rounded-full px-4 py-2 mb-6">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-black text-amber-300">{freelancer.rating}</span>
                <span className="text-xs text-slate-400">Top Rated</span>
              </div>

              <Link href="/explore" className="w-full">
                <button className="w-full py-2.5 rounded-xl text-sm font-bold text-violet-300 hover:text-white transition-all duration-200 group-hover:bg-violet-600/20" style={{ border: '1px solid rgba(124,58,237,0.3)' }}>
                  View Profile <ArrowRight className="inline h-3.5 w-3.5 ml-1" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ======================== CTA BANNER ======================== */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(99,102,241,0.15) 50%, rgba(217,70,239,0.1) 100%)', border: '1px solid rgba(124,58,237,0.3)' }}>
          <div className="orb orb-violet animate-orb-1" style={{ width: 300, height: 300, top: '-50%', right: '5%', opacity: 0.5 }} />
          <div className="relative z-10 text-center py-16 px-8">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Ready to bring your <span className="gradient-text-bright">vision</span> to life?
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
              Browse thousands of creative professionals and hire the perfect freelancer today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <button className="btn-gradient px-8 py-4 text-base font-bold text-white rounded-2xl">
                  Find Freelancers <ArrowRight className="inline h-4 w-4 ml-2" />
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-8 py-4 text-base font-bold text-white rounded-2xl transition-all hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}>
                  Join as a Freelancer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
