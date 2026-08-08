'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { login } from '../actions';
import { ArrowRight, Code2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
          
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center justify-center bg-black text-white h-12 w-12 rounded-xl mb-6 font-bold text-lg tracking-tighter">
                AC
              </Link>
              <h1 className="text-2xl font-bold text-black tracking-tight mb-2">Welcome Back</h1>
              <p className="text-sm text-gray-500">Sign in to manage your skill swaps</p>
            </div>

            {error && (
              <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider" htmlFor="password">
                    Password
                  </label>
                  <Link href="#" className="text-xs font-semibold text-gray-500 hover:text-black">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3.5 text-sm font-bold text-white hover:bg-gray-800 transition-colors mt-6 disabled:opacity-50"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link href="/signup" className="font-bold text-black hover:underline">
                Join Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
