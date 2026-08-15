'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Profile } from '@/lib/types';
import { Search, UserCheck, RotateCcw } from 'lucide-react';

interface ExploreClientProps {
  initialProfiles: Profile[];
}

const CREATIVE_CATEGORIES = [
  'All',
  'Illustration',
  'Painting',
  'Music & Singing',
  'Dance & Performance',
  'Photography',
  'Murals',
  'Sculpture',
  'Graphic Design',
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
        (profile.skills || []).some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        categoryFilter === 'All' ||
        (profile.skills || []).some((s) =>
          s.toLowerCase().includes(categoryFilter.toLowerCase())
        ) ||
        profile.bio?.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter, initialProfiles]);

  const handleResetFilters = () => {
    setCategoryFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
            Find Freelancers
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl font-medium">
            Discover talented local artists, painters, singers, and dancers — and hire them directly for your project.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                Search Freelancers
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, specialty, or bio..."
                  className="w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer"
              >
                {CREATIVE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {(categoryFilter !== 'All' || searchQuery) && (
            <div className="mt-6 flex justify-end border-t border-gray-100 pt-4">
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        <div className="mb-8 flex items-center justify-between text-sm text-gray-500 font-medium">
          <span>Showing <strong className="text-black">{filteredArtists.length}</strong> freelancers available</span>
        </div>

        {filteredArtists.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500 font-medium">No freelancers found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArtists.map((artist) => (
              <div
                key={artist.id}
                className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300 transition-colors"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <img
                      src={artist.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80'}
                      alt={artist.full_name || artist.username}
                      className="h-16 w-16 rounded-full object-cover ring-1 ring-gray-100 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-black truncate">
                          {artist.full_name || artist.username}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700 border border-green-200 shrink-0">
                          <UserCheck className="h-3 w-3" /> Available
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">@{artist.username}</p>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {artist.bio || "No bio provided."}
                      </p>
                    </div>
                  </div>

                  {/* Specialties */}
                  {(artist.skills || []).length > 0 && (
                    <div className="mt-5">
                      <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block mb-2">
                        Specialties
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(artist.skills || []).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700 border border-violet-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
                  <Link
                    href={`/profile/${artist.id}`}
                    className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
                  >
                    View Profile &rarr;
                  </Link>

                  <Link
                    href={`/profile/${artist.id}`}
                    className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-violet-700 transition-colors"
                  >
                    Hire Now
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
