'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { login } from '../actions';
import { AlertCircle, Zap, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const isEmailConfirmationError = error?.toLowerCase().includes('email not confirmed');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-violet animate-orb-1" style={{ width: 600, height: 600, top: '-20%', left: '-15%', opacity: 0.4 }} />
        <div className="orb orb-indigo animate-orb-2" style={{ width: 400, height: 400, bottom: '-10%', right: '-10%', opacity: 0.3 }} />
        <div className="orb orb-pink animate-orb-3" style={{ width: 250, height: 250, top: '40%', right: '15%', opacity: 0.2 }} />
        {/* Grid */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md animate-slide-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex flex-col items-center gap-3 group">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-xl shadow-violet-900/50 group-hover:shadow-violet-700/70 transition-all duration-300 group-hover:scale-110 animate-glow-pulse">
                <Zap className="h-6 w-6 text-white" fill="white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Artisan<span className="gradient-text">Connect</span>
              </span>
            </Link>
            <h1 className="text-3xl font-black text-white mt-6 mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-slate-400 text-sm">Sign in to manage your hires, orders & projects</p>
          </div>

          {/* Card */}
          <div className="glass-strong rounded-3xl p-8" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-2xl p-4 text-sm space-y-2 animate-fade-in" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
                <div className="flex items-center gap-2 font-semibold text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{isEmailConfirmationError ? 'Email Not Confirmed' : error}</span>
                </div>
                {isEmailConfirmationError && (
                  <p className="text-xs text-red-300/80 pl-6 leading-relaxed">
                    Please check your inbox and click the verification link.
                  </p>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="input-dark w-full rounded-xl px-4 py-3.5 text-sm text-white"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest" htmlFor="password">
                    Password
                  </label>
                  <Link href="#" className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="input-dark w-full rounded-xl px-4 py-3.5 text-sm text-white pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-gradient py-4 text-sm font-bold text-white rounded-xl mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing In...
                  </>
                ) : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="font-bold text-violet-400 hover:text-violet-300 transition-colors hover:underline underline-offset-2">
              Join Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
