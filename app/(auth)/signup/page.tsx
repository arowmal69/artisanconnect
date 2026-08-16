'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signup } from '../actions';
import { AlertCircle, Palette, Briefcase, MailCheck, ArrowRight, Zap, Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'buyer' | 'seller'>('seller');
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.append('role', role);
    const result = await signup(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result?.emailConfirmationRequired) {
      setConfirmationEmail(result.email || 'your email');
      setIsLoading(false);
    }
  }

  if (confirmationEmail) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: '#0a0a0f' }}>
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="orb orb-violet animate-orb-1" style={{ width: 500, height: 500, top: '-15%', left: '-10%', opacity: 0.4 }} />
          <div className="orb orb-indigo animate-orb-2" style={{ width: 350, height: 350, bottom: '-5%', right: '-8%', opacity: 0.3 }} />
        </div>
        <div className="relative z-10 w-full max-w-md glass-strong rounded-3xl p-10 text-center animate-slide-up" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl glass-violet flex items-center justify-center animate-glow-pulse">
            <MailCheck className="h-8 w-8 text-violet-400" />
          </div>
          <h1 className="text-2xl font-black text-white mb-3">Check Your Email</h1>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            We sent a verification link to{' '}
            <strong className="text-white font-bold">{confirmationEmail}</strong>.
            Click it to confirm your account and log in.
          </p>
          <div className="rounded-2xl p-4 text-xs text-amber-300/80 text-left mb-6 leading-relaxed" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <p className="font-bold mb-1">💡 For Local Development:</p>
            Go to <strong>Supabase Dashboard → Authentication → Providers → Email</strong> and turn off <em>"Confirm email"</em> for instant login.
          </div>
          <Link href="/login" className="block w-full">
            <button className="w-full btn-gradient py-3.5 text-sm font-bold text-white rounded-xl">
              Proceed to Sign In <ArrowRight className="inline h-4 w-4 ml-1.5" />
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-violet animate-orb-1" style={{ width: 600, height: 600, top: '-20%', left: '-15%', opacity: 0.4 }} />
        <div className="orb orb-indigo animate-orb-2" style={{ width: 400, height: 400, bottom: '-10%', right: '-10%', opacity: 0.3 }} />
        <div className="orb orb-pink animate-orb-3" style={{ width: 250, height: 250, top: '50%', right: '20%', opacity: 0.2 }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 py-12 relative z-10">
        <div className="w-full max-w-xl animate-slide-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex flex-col items-center gap-3 group">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center shadow-xl shadow-violet-900/50 group-hover:shadow-violet-700/70 transition-all duration-300 group-hover:scale-110">
                <Zap className="h-6 w-6 text-white" fill="white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Artisan<span className="gradient-text">Connect</span>
              </span>
            </Link>
            <h1 className="text-3xl font-black text-white mt-6 mb-2">Create an Account</h1>
            <p className="text-slate-400 text-sm">The creative freelancer marketplace</p>
          </div>

          {/* Card */}
          <div className="glass-strong rounded-3xl p-8" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>

            {/* Role Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'seller' as const, icon: Palette, title: 'Offer Creative Services', sub: 'Artist, Painter, Singer, Dancer' },
                  { value: 'buyer' as const, icon: Briefcase, title: 'Hire Freelancers', sub: 'Client commissioning work' },
                ].map(({ value, icon: Icon, title, sub }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className={`flex flex-col items-center gap-2 p-5 rounded-2xl text-center transition-all duration-200 ${
                      role === value
                        ? 'border-violet-500/60 bg-violet-600/15 text-white'
                        : 'border-white/8 bg-white/3 text-slate-400 hover:border-white/15 hover:bg-white/5'
                    }`}
                    style={{ border: `1px solid ${role === value ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.08)'}`, boxShadow: role === value ? '0 0 20px rgba(124,58,237,0.2)' : 'none' }}
                  >
                    <Icon className={`h-6 w-6 ${role === value ? 'text-violet-400' : 'text-slate-500'} transition-colors`} />
                    <span className="text-sm font-bold">{title}</span>
                    <span className="text-[11px] text-slate-500 font-normal">{sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-center gap-2 rounded-2xl p-4 text-sm animate-fade-in" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span className="text-red-400">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username + Full Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username" name="username" type="text" required placeholder="creative123"
                    className="input-dark w-full rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName" name="full_name" type="text" required placeholder="Jane Doe"
                    className="input-dark w-full rounded-xl px-4 py-3 text-sm text-white"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email" name="email" type="email" required placeholder="you@example.com"
                  className="input-dark w-full rounded-xl px-4 py-3 text-sm text-white"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password" name="password" type={showPassword ? 'text' : 'password'} required placeholder="••••••••"
                    className="input-dark w-full rounded-xl px-4 py-3 text-sm text-white pr-12"
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

              {/* Freelancer fields */}
              {role === 'seller' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="skills">
                      Your Specialties / Services
                    </label>
                    <input
                      id="skills" name="skills" type="text"
                      placeholder="e.g. Digital Illustration, Oil Painting, Vocal Session, Contemporary Dance"
                      className="input-dark w-full rounded-xl px-4 py-3 text-sm text-white"
                    />
                    <p className="text-[11px] text-slate-500 mt-1.5">Comma-separated list of your creative services</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="portfolio_url">
                      Portfolio / Social Link <span className="text-slate-600 font-normal normal-case">(Optional)</span>
                    </label>
                    <input
                      id="portfolio_url" name="portfolio_url" type="url"
                      placeholder="https://artstation.com/yourprofile or Instagram"
                      className="input-dark w-full rounded-xl px-4 py-3 text-sm text-white"
                    />
                  </div>
                </>
              )}

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" htmlFor="bio">
                  Bio <span className="text-slate-600 font-normal normal-case">(Optional)</span>
                </label>
                <textarea
                  id="bio" name="bio" rows={3}
                  placeholder={role === 'seller' ? 'Tell clients about your creative style, experience, and services...' : 'Describe what kind of creative talent or projects you are looking to hire for...'}
                  className="input-dark w-full rounded-xl px-4 py-3 text-sm text-white resize-none"
                />
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
                    Creating Account...
                  </>
                ) : 'Create Account'}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-violet-400 hover:text-violet-300 transition-colors hover:underline underline-offset-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
