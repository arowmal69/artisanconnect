'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signup } from '../actions';
import { ArrowRight, AlertCircle } from 'lucide-react';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <div className="flex-1 flex items-center justify-center p-4 my-8">
        <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
          
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center justify-center bg-black text-white h-12 w-12 rounded-xl mb-6 font-bold text-lg tracking-tighter">
                AC
              </Link>
              <h1 className="text-2xl font-bold text-black tracking-tight mb-2">Create an Account</h1>
              <p className="text-sm text-gray-500">Join the ArtisanConnect network</p>
            </div>

            {error && (
              <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="creative123"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="full_name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="skillsOffered">
                    Skills to Offer
                  </label>
                  <input
                    id="skillsOffered"
                    name="skillsOffered"
                    type="text"
                    placeholder="e.g. 3D Modeling, Blender"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                  />
                  <p className="text-[10px] text-gray-500 mt-1.5">Comma separated</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="skillsWanted">
                    Skills to Learn
                  </label>
                  <input
                    id="skillsWanted"
                    name="skillsWanted"
                    type="text"
                    placeholder="e.g. Oil Painting, Color Theory"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                  />
                  <p className="text-[10px] text-gray-500 mt-1.5">Comma separated</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="portfolio_url">
                    Portfolio Link <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                  </label>
                  <input
                    id="portfolio_url"
                    name="portfolio_url"
                    type="url"
                    placeholder="https://artstation.com/yourprofile"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="bio">
                    Bio <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    placeholder="Tell others about your creative journey..."
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3.5 text-sm font-bold text-white hover:bg-gray-800 transition-colors mt-6 disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-black hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
