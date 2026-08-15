'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signup } from '../actions';
import { AlertCircle, Palette, Briefcase, MailCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'buyer' | 'seller'>('seller');
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null);

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
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
        <div className="flex-1 flex items-center justify-center p-4 my-8">
          <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-violet-100 shadow-sm">
              <MailCheck className="h-8 w-8" />
            </div>
            
            <h1 className="text-2xl font-bold text-black tracking-tight mb-2">Check Your Email</h1>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              We sent a verification link to <strong className="text-black font-semibold">{confirmationEmail}</strong>. Please click the link to confirm your account and log in.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 text-left mb-6 leading-relaxed">
              <p className="font-bold mb-1">💡 For Local Development:</p>
              If you want instant login without clicking email links, go to your <strong>Supabase Dashboard &gt; Authentication &gt; Providers &gt; Email</strong> and turn off <em>"Confirm email"</em>.
            </div>

            <Link href="/login" className="block w-full">
              <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 font-semibold shadow-md">
                Proceed to Sign In <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <div className="flex-1 flex items-center justify-center p-4 my-8">
        <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
          
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center justify-center bg-violet-600 text-white h-12 w-12 rounded-xl mb-4 font-bold text-lg tracking-tighter shadow-md hover:bg-violet-700 transition-colors">
                AC
              </Link>
              <h1 className="text-2xl font-bold text-black tracking-tight mb-2">Create an Account</h1>
              <p className="text-sm text-gray-500">Join ArtisanConnect — The creative freelancer marketplace</p>
            </div>

            {/* Account Type Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                I want to:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('seller')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                    role === 'seller'
                      ? 'border-violet-600 bg-violet-50 text-violet-900 font-bold ring-1 ring-violet-600'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Palette className="h-5 w-5 mb-1.5 text-violet-600" />
                  <span className="text-sm font-semibold">Offer Creative Services</span>
                  <span className="text-[11px] text-gray-500 font-normal mt-0.5">Artist, Painter, Singer, Dancer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                    role === 'buyer'
                      ? 'border-violet-600 bg-violet-50 text-violet-900 font-bold ring-1 ring-violet-600'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Briefcase className="h-5 w-5 mb-1.5 text-violet-600" />
                  <span className="text-sm font-semibold">Hire Freelancers</span>
                  <span className="text-[11px] text-gray-500 font-normal mt-0.5">Client commissioning work</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600 transition-all"
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
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600 transition-all"
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
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600 transition-all"
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
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600 transition-all"
                />
              </div>

              {/* Freelancer Specialties (Only if offering services) */}
              {role === 'seller' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="skills">
                    Your Specialties / Services Offered
                  </label>
                  <input
                    id="skills"
                    name="skills"
                    type="text"
                    placeholder="e.g. Digital Illustration, Oil Painting, Vocal Session, Contemporary Dance"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600 transition-all"
                  />
                  <p className="text-[10px] text-gray-500 mt-1.5">Comma separated list of creative services you provide</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 pt-1">
                {role === 'seller' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="portfolio_url">
                      Portfolio / Social Link <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                    </label>
                    <input
                      id="portfolio_url"
                      name="portfolio_url"
                      type="url"
                      placeholder="https://artstation.com/yourprofile or Instagram"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600 transition-all"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="bio">
                    Bio <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    placeholder={role === 'seller' ? "Tell clients about your creative style, experience, and services..." : "Describe what kind of creative talent or projects you are looking to hire for..."}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600 transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3.5 text-sm font-bold text-white hover:bg-violet-700 transition-colors mt-6 shadow-md disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-violet-600 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
