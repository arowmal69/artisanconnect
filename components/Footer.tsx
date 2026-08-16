import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="py-14"
      style={{ background: '#080810', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-lg shadow-violet-900/50">
                <Zap className="h-4 w-4 text-white" fill="white" />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                Artisan<span className="gradient-text">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Hire talented local artists, illustrators, singers, and dancers for your next creative project.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Platform</h4>
              <ul className="space-y-3">
                {[
                  { href: '/explore', label: 'Find Freelancers' },
                  { href: '/dashboard', label: 'Dashboard' },
                  { href: '#', label: 'How it Works' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-500 hover:text-violet-400 transition-colors font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-3">
                {[
                  { href: '#', label: 'Privacy Policy' },
                  { href: '#', label: 'Terms of Service' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-500 hover:text-violet-400 transition-colors font-medium">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} ArtisanConnect. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built for creators, by creators. ✨
          </p>
        </div>
      </div>
    </footer>
  );
}
