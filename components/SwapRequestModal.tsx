'use client';

import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Profile } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { createSwapRequest } from '@/app/actions/swaps';

interface SwapRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetArtist: Profile;
}

export default function SwapRequestModal({ isOpen, onClose, targetArtist }: SwapRequestModalProps) {
  const [offeredSkill, setOfferedSkill] = useState('');
  const [requestedSkill, setRequestedSkill] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const result = await createSwapRequest(targetArtist.id, offeredSkill, requestedSkill, message);
      
      if (result.error) {
        throw new Error(result.error);
      }

      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);

    } catch (err: any) {
      console.error(err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-xl transform transition-all">
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-gray-100 p-6 bg-white">
          <div className="flex items-center gap-2 text-black">
            <Sparkles className="h-5 w-5" />
            <h2 className="text-lg font-bold text-black">Propose Skill Swap</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-black transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-12 text-center flex flex-col items-center bg-white">
            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mb-4 border border-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Request Sent!</h3>
            <p className="text-sm text-gray-500">
              {targetArtist.full_name} has been notified. Check your dashboard for updates.
            </p>
          </div>
        ) : (
          <div className="p-6 bg-white">
            {/* Target Artist Card */}
            <div className="mb-6 flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <img
                src={targetArtist.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80'}
                alt={targetArtist.full_name}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-gray-200"
              />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-0.5">Requesting with</p>
                <h3 className="text-sm font-bold text-black">{targetArtist.full_name}</h3>
                <p className="text-xs text-gray-500 font-medium">@{targetArtist.username}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Skill Exchange Configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* I offer */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">I will teach you:</label>
                  <input
                    type="text"
                    required
                    value={offeredSkill}
                    onChange={(e) => setOfferedSkill(e.target.value)}
                    placeholder="e.g. 3D Modeling"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                {/* I want to learn */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">I want to learn:</label>
                  <input
                    type="text"
                    required
                    value={requestedSkill}
                    onChange={(e) => setRequestedSkill(e.target.value)}
                    placeholder="e.g. Digital Illustration"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Introduction Message:</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Hi ${targetArtist.full_name}, I love your work and would love to exchange skills!`}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 border border-red-100">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Failed to send request. Please ensure you are logged in.
                </div>
              )}

              {/* Submit Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-xl bg-black px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                  {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
