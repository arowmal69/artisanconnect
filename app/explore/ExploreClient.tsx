'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SwapRequestModal from '@/components/SwapRequestModal';
import { Profile } from '@/lib/types';
import { Search, Sparkles, MessageSquare, UserCheck, RotateCcw, Layers, Tag } from 'lucide-react';

interface ExploreClientProps {
  initialProfiles: Profile[];
}

export default function ExploreClient({ initialProfiles }: ExploreClientProps) {
  const [offeredFilter, setOfferedFilter] = useState<string>('');
  const [desiredFilter, setDesiredFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedArtistForSwap, setSelectedArtistForSwap] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const popularSkills = [
    '3D Modeling',
    'Blender',
    'Oil Painting',
    'Watercolor Painting',
    'UI/UX Design',
    'Figma',
    'Sound Design',
    'Motion Graphics',
    'Character Design',
  ];

  const filteredArtists = useMemo(() => {
    return initialProfiles.filter((profile) => {
      const matchesSearch =
        !searchQuery ||
        profile.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.bio?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesOffered =
        !offeredFilter ||
        (profile.skills_offered || []).some((skill) =>
          skill.toLowerCase().includes(offeredFilter.toLowerCase())
        );

      const matchesDesired =
        !desiredFilter ||
        (profile.skills_wanted || []).some((skill) =>
          skill.toLowerCase().includes(desiredFilter.toLowerCase())
        );

      return matchesSearch && matchesOffered && matchesDesired;
    });
  }, [searchQuery, offeredFilter, desiredFilter, initialProfiles]);

  const handleOpenSwapModal = (artist: Profile) => {
    setSelectedArtistForSwap(artist);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setOfferedFilter('');
    setDesiredFilter('');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4">
            Explore Artists
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl font-medium">
            Find creators who possess the craft you want to master, and exchange your unique skills 1-on-1.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                Artist Search
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search artist name, bio..."
                  className="w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                They Teach
              </label>
              <select
                value={offeredFilter}
                onChange={(e) => setOfferedFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer"
              >
                <option value="" className="text-gray-500">Any Skill</option>
                {popularSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                You Teach
              </label>
              <select
                value={desiredFilter}
                onChange={(e) => setDesiredFilter(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all appearance-none cursor-pointer"
              >
                <option value="" className="text-gray-500">Any Skill</option>
                {popularSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(offeredFilter || desiredFilter || searchQuery) && (
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
          <span>Showing <strong className="text-black">{filteredArtists.length}</strong> creator partners</span>
        </div>

        {filteredArtists.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500 font-medium">No artists found matching your criteria.</p>
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

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block mb-2">
                        Teaches
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(artist.skills_offered || []).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold tracking-wider text-gray-400 uppercase block mb-2">
                        Wants
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(artist.skills_wanted || []).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md border border-gray-200 px-2.5 py-1 text-[11px] font-semibold text-gray-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
                  <Link
                    href={`/profile/${artist.id}`}
                    className="text-sm font-bold text-gray-500 hover:text-black transition-colors"
                  >
                    View Profile &rarr;
                  </Link>

                  <button
                    onClick={() => handleOpenSwapModal(artist)}
                    className="flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-bold text-white hover:bg-gray-800 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Request Swap</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedArtistForSwap && (
        <SwapRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          targetArtist={selectedArtistForSwap}
        />
      )}

      <Footer />
    </div>
  );
}
