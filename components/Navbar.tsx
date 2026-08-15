'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { logout } from '@/app/(auth)/actions';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };
    
    fetchUser();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center bg-violet-600 text-white rounded-lg font-bold text-xs tracking-tighter shadow-sm group-hover:bg-violet-700 transition-colors">
            AC
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            ArtisanConnect
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-violet-600 transition-colors">
            Home
          </Link>
          <Link href="/explore" className="hover:text-violet-600 transition-colors">
            Find Freelancers
          </Link>
          {user && (
            <Link href="/dashboard" className="hover:text-violet-600 transition-colors">
              My Orders
            </Link>
          )}
        </nav>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center gap-4">
          {isLoading ? (
            <div className="h-8 w-24 bg-slate-100 animate-pulse rounded-md" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-slate-600 hover:text-violet-600">
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-violet-100 transition-all">
                  <AvatarImage src={user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} />
                  <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <form action={logout}>
                  <Button type="submit" variant="ghost" size="icon" className="text-slate-400 hover:text-red-600" title="Log out">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-600 hover:text-violet-600">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                  Join Free
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-600"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white p-4 space-y-2 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-violet-600 rounded-md"
          >
            Home
          </Link>
          <Link
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-violet-600 rounded-md"
          >
            Find Freelancers
          </Link>
          
          <div className="pt-4 mt-2 border-t border-slate-100">
            {user ? (
               <div className="space-y-2">
                 <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-violet-600 rounded-md"
                  >
                    My Orders
                  </Link>
                 <form action={logout} className="w-full">
                   <Button
                     type="submit"
                     variant="ghost"
                     className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                     onClick={() => setMobileMenuOpen(false)}
                   >
                     <LogOut className="h-4 w-4 mr-2" /> Log Out
                   </Button>
                 </form>
               </div>
            ) : (
               <div className="space-y-2 p-2 flex flex-col">
                 <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                   <Button variant="outline" className="w-full">Log In</Button>
                 </Link>
                 <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full">
                   <Button className="w-full bg-violet-600 hover:bg-violet-700">Join Free</Button>
                 </Link>
               </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
