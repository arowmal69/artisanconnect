'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Profile, PortfolioPost } from '@/lib/types';
import { MapPin, Calendar, Tag, Camera, Briefcase, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface ProfileClientProps {
  artist: Profile;
  initialPosts: PortfolioPost[];
}

export default function ProfileClient({ artist, initialPosts }: ProfileClientProps) {
  const [selectedImage, setSelectedImage] = useState<PortfolioPost | null>(null);

  const formattedDate = new Date(artist.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Profile Header section */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-16">
          <img
            src={artist.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'}
            alt={artist.full_name || artist.username}
            className="h-32 w-32 md:h-48 md:w-48 rounded-full object-cover ring-4 ring-white shadow-sm"
          />
          
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-5xl font-black text-black tracking-tight">{artist.full_name || artist.username}</h1>
                  <CheckCircle2 className="h-6 w-6 text-violet-500 shrink-0" />
                </div>
                <p className="text-lg text-gray-500 font-medium mt-1">@{artist.username}</p>
                
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-400 font-semibold tracking-wide">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> Earth
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> Joined {formattedDate}
                  </span>
                </div>
              </div>

              {/* Hire Me CTA */}
              <Link
                href={`/explore`}
                className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white hover:bg-violet-700 transition-colors shrink-0"
              >
                <Briefcase className="h-4 w-4" /> Hire Me
              </Link>
            </div>
            
            <p className="text-base text-gray-600 max-w-2xl leading-relaxed mt-4">
              {artist.bio || "No bio provided."}
            </p>

            {/* Specialties */}
            {(artist.skills || []).length > 0 && (
              <div className="pt-4 border-t border-gray-200 mt-6">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Specialties</span>
                <div className="flex flex-wrap gap-2">
                  {(artist.skills || []).map((skill) => (
                    <span key={skill} className="rounded-md bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 border border-violet-100">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="mb-12 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-black tracking-tight">Portfolio Showcase</h2>
        </div>

        {initialPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <Camera className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No artwork uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialPosts.map((post) => (
              <div key={post.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:border-gray-300 transition-all flex flex-col cursor-pointer" onClick={() => setSelectedImage(post)}>
                <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-black mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                    {post.description}
                  </p>
                  
                  <div className="mt-auto flex flex-wrap gap-2">
                    {(post.tags || []).map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">
                        <Tag className="h-3 w-3" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-2xl"
          >
            <div className="absolute top-4 right-4 z-10">
               <button onClick={() => setSelectedImage(null)} className="p-2 bg-white/80 hover:bg-white rounded-full text-black backdrop-blur-md transition-colors shadow-sm">
                 <span className="sr-only">Close</span>
                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="w-full max-h-[75vh] object-contain bg-gray-100"
            />
            <div className="p-6 bg-white border-t border-gray-100">
              <h3 className="text-xl font-bold text-black">{selectedImage.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-2xl">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
