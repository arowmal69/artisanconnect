import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#FAFAFA] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="flex h-8 w-8 items-center justify-center bg-black text-white font-bold text-xs tracking-tighter">
                AC
              </div>
              <span className="text-lg font-bold text-black tracking-tight">
                ArtisanConnect
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              A peer-to-peer network connecting creative minds. Exchange skills, collaborate on projects, and build your portfolio.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-sm font-semibold text-black mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="/explore" className="hover:text-black transition-colors">Explore</Link></li>
                <li><Link href="/dashboard" className="hover:text-black transition-colors">Dashboard</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">How it works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-black mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="#" className="hover:text-black transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-black transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} ArtisanConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
