'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut, Zap } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { logout } from '@/app/(auth)/actions';
import { User as SupabaseUser } from '@supabase/supabase-js';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };
    fetchUser();

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-2xl border-b border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-black/40 backdrop-blur-xl border-b border-white/5'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg shadow-violet-900/50 group-hover:shadow-violet-700/60 transition-all duration-300 group-hover:scale-110">
            <Zap className="h-4.5 w-4.5 text-white" fill="white" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Artisan<span className="gradient-text">Connect</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: '/', label: 'Home' },
            { href: '/explore', label: 'Find Freelancers' },
            ...(user ? [{ href: '/dashboard', label: 'My Orders' }] : []),
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg transition-all duration-200 hover:bg-white/5 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-400 rounded-full group-hover:w-3/4 transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <div className="h-8 w-24 bg-white/5 animate-pulse rounded-lg" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
                  Dashboard
                </button>
              </Link>
              <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                <img
                  src={user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`}
                  alt="avatar"
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-violet-500/40 hover:ring-violet-500/80 transition-all cursor-pointer"
                />
                <form action={logout}>
                  <button
                    type="submit"
                    title="Log out"
                    className="flex items-center justify-center h-8 w-8 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <button className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
                  Log In
                </button>
              </Link>
              <Link href="/signup">
                <button className="relative px-5 py-2 text-sm font-semibold text-white rounded-xl btn-gradient overflow-hidden group">
                  <span className="relative z-10">Join Free</span>
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center h-9 w-9 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-dark border-t border-white/8 p-4 space-y-1 animate-fade-in">
          {[
            { href: '/', label: 'Home' },
            { href: '/explore', label: 'Find Freelancers' },
            ...(user ? [{ href: '/dashboard', label: 'My Orders' }, { href: '/messages', label: 'Messages' }] : []),
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 mt-2 border-t border-white/8">
            {user ? (
              <form action={logout} className="w-full">
                <button
                  type="submit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                >
                  <LogOut className="h-4 w-4" /> Log Out
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-2 p-1">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-2.5 text-sm font-medium text-slate-300 border border-white/10 rounded-xl hover:bg-white/5 transition-all">
                    Log In
                  </button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-4 py-2.5 text-sm font-semibold text-white rounded-xl btn-gradient">
                    Join Free
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
