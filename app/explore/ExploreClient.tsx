'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Profile } from '@/lib/types';
import { Search, UserCheck, RotateCcw, SlidersHorizontal, Star, ArrowRight } from 'lucide-react';

interface ExploreClientProps {
  initialProfiles: Profile[];
}

const CREATIVE_CATEGORIES = [
  'All', 'Illustration', 'Painting', 'Music & Singing',
  'Dance & Performance', 'Photography', 'Murals', 'Sculpture', 'Graphic Design',
];

export default function ExploreClient({ initialProfiles }: ExploreClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredArtists = useMemo(() => {
    return initialProfiles.filter((profile) => {
      const matchesSearch =
        !searchQuery ||
        profile.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (profile.skills || []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        categoryFilter === 'All' ||
        (profile.skills || []).some((s) => s.toLowerCase().includes(categoryFilter.toLowerCase())) ||
        profile.bio?.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter, initialProfiles]);

  const handleResetFilters = () => {
    setCategoryFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      <Navbar />

      {/* Page Header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0820 60%, #0a0a0f 100%)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="orb orb-violet animate-orb-1" style={{ width: 400, height: 400, top: '-30%', right: '-5%', opacity: 0.35 }} />
        <div className="orb orb-indigo animate-orb-2" style={{ width: 300, height: 300, bottom: '-40%', left: '10%', opacity: 0.25 }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 glass-violet rounded-full px-4 py-2 mb-6">
              <UserCheck className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-bold text-violet-300">
                {initialProfiles.length}+ Creative Freelancers Ready to Hire
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-4">
              Find <span className="gradient-text-bright">Freelancers</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Discover talented local artists, painters, singers, and dancers — and hire them directly for your project.
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

        {/* Category Chip Pills */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {CREATIVE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  categoryFilter === cat
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={{
                  background: categoryFilter === cat
                    ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                    : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${categoryFilter === cat ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: categoryFilter === cat ? '0 0 15px rgba(124,58,237,0.35)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search + Filter Panel */}
        <div className="glass rounded-2xl p-5 mb-10 animate-fade-in animate-delay-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, specialty, or bio..."
                className="input-dark w-full rounded-xl pl-11 pr-4 py-3 text-sm text-white"
              />
            </div>
            {(categoryFilter !== 'All' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors px-4 py-3 rounded-xl shrink-0"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500 font-medium">
            Showing <strong className="text-white font-bold">{filteredArtists.length}</strong> freelancers available
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Sorted by: Top Rated</span>
          </div>
        </div>

        {/* Cards Grid */}
        {filteredArtists.length === 0 ? (
          <div className="text-center py-24 glass rounded-3xl animate-fade-in">
            <div className="h-16 w-16 rounded-full glass-violet mx-auto mb-4 flex items-center justify-center">
              <Search className="h-7 w-7 text-violet-400" />
            </div>
            <p className="text-white font-bold text-lg mb-2">No freelancers found</p>
            <p className="text-slate-500 text-sm">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArtists.map((artist, idx) => (
              <div
                key={artist.id}
                className="card-hover glass rounded-3xl p-6 flex flex-col justify-between animate-fade-in"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div>
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={artist.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${artist.username}`}
                        alt={artist.full_name || artist.username}
                        className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white/8"
                      />
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 ring-2 ring-[#0a0a0f] flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-black text-white truncate">
                          {artist.full_name || artist.username}
                        </h3>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-amber-300">5.0</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mb-2">@{artist.username}</p>
                      <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                        {artist.bio || 'No bio provided.'}
                      </p>
                    </div>
                  </div>

                  {/* Specialties */}
                  {(artist.skills || []).length > 0 && (
                    <div className="mt-5">
                      <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase block mb-2">
                        Specialties
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(artist.skills || []).map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-violet-300"
                            style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="mt-6 flex items-center justify-between pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <Link
                    href={`/profile/${artist.id}`}
                    className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    View Profile →
                  </Link>
                  <Link
                    href={`/profile/${artist.id}`}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white rounded-xl btn-gradient"
                  >
                    Hire Now <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
