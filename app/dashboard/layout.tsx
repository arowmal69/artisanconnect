'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Share, Code2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [userStatus, setUserStatus] = useState<'online' | 'busy' | 'offline'>('online');

  return (
    <div className="min-h-screen bg-[#ebf0ef] text-slate-800 font-sans flex flex-col relative overflow-hidden">
      
      {/* Decorative Background Shapes (as seen in mockup) */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-teal-600/5 rounded-br-full pointer-events-none" />
      <div className="absolute top-40 -left-10 w-48 h-48 bg-[#d96b43]/10 rounded-full pointer-events-none" />
      <div className="absolute top-[30%] -left-12 w-32 h-64 bg-white/40 rounded-r-full pointer-events-none" />
      
      <div className="absolute top-20 right-10 w-40 h-40 bg-teal-600/10 rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[-5%] w-64 h-64 bg-white/40 rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-10 h-10 bg-[#d96b43]/20 rounded-full pointer-events-none" />

      {/* Top Header Navigation (Dark Teal) */}
      <header className="sticky top-0 z-40 w-full bg-[#203c3a] shadow-md text-white">
        <div className="w-full flex h-16 items-center justify-between px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center text-teal-300 font-black text-2xl tracking-tighter">
              AC
            </div>
            <span className="text-lg font-bold text-white tracking-wide flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-teal-300 opacity-60" />
              ArtisanConnect
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/dashboard"
              className={`px-4 py-1.5 rounded-lg transition-colors ${
                pathname === '/dashboard'
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              My Dashboard
            </Link>

            <Link
              href="/profile/1"
              className="text-white/70 hover:text-white transition-colors"
            >
              Portfolio
            </Link>

            <Link
              href="/explore"
              className="text-white/70 hover:text-white transition-colors"
            >
              Discover Swaps
            </Link>

            <Link
              href="/messages"
              className="text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
            >
              Inbox <span className="text-amber-500 font-bold">(3)</span>
            </Link>
          </nav>

          {/* User Profile & Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
                alt="User"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white/20"
              />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#203c3a]" />
            </div>

            <div className="hidden sm:flex items-center gap-1 cursor-pointer">
              <span className="text-sm font-medium text-white">Online</span>
              <ChevronDown className="h-4 w-4 text-white/70" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
