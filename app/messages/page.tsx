'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useChatMessages } from '@/hooks/useChatMessages';
import { MOCK_PROFILES } from '@/lib/mock-data';
import { Profile, SkillSwapRequest } from '@/lib/types';
import {
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

export default function MessagesDashboard() {
  const currentUser: Profile = MOCK_PROFILES[0];

  const [swapRequests, setSwapRequests] = useState<SkillSwapRequest[]>([
    {
      id: 'swap-1',
      sender_id: MOCK_PROFILES[1].id,
      receiver_id: currentUser.id,
      offered_skill: 'Oil Painting',
      requested_skill: '3D Modeling',
      status: 'accepted',
      created_at: '2026-02-20T10:00:00Z',
      sender_profile: MOCK_PROFILES[1],
      receiver_profile: currentUser,
    },
    {
      id: 'swap-2',
      sender_id: MOCK_PROFILES[2].id,
      receiver_id: currentUser.id,
      offered_skill: 'UI/UX Design',
      requested_skill: 'Blender',
      status: 'pending',
      created_at: '2026-02-22T14:30:00Z',
      sender_profile: MOCK_PROFILES[2],
      receiver_profile: currentUser,
    },
  ]);

  const [activeSwapId, setActiveSwapId] = useState<string>('swap-1');
  const [inputMessage, setInputMessage] = useState<string>('');

  const activeSwap = swapRequests.find((s) => s.id === activeSwapId) || swapRequests[0];
  const partnerProfile =
    activeSwap.sender_id === currentUser.id
      ? activeSwap.receiver_profile || MOCK_PROFILES[1]
      : activeSwap.sender_profile || MOCK_PROFILES[1];

  const initialThreadMessages = [
    {
      id: 'm1',
      swap_id: 'swap-1',
      sender_id: MOCK_PROFILES[1].id,
      receiver_id: currentUser.id,
      content: 'Hey Elena! Loved your 3D cyberpunk cityscape. Ready to start our 3D for oil painting exchange?',
      created_at: '2026-02-20T10:05:00Z',
    },
    {
      id: 'm2',
      swap_id: 'swap-1',
      sender_id: currentUser.id,
      receiver_id: MOCK_PROFILES[1].id,
      content: 'Hi Marcus! Absolutely. I can walk you through Blender Octane lighting techniques first.',
      created_at: '2026-02-20T10:12:00Z',
    },
  ];

  const { messages, sendMessage } = useChatMessages(activeSwapId, initialThreadMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    sendMessage(currentUser.id, partnerProfile.id, inputMessage);
    setInputMessage('');
  };

  const handleUpdateStatus = (swapId: string, newStatus: 'accepted' | 'declined') => {
    setSwapRequests((prev) =>
      prev.map((s) => (s.id === swapId ? { ...s, status: newStatus } : s))
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f6f5] text-slate-800 font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {/* Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#365353]/10 px-3.5 py-1 text-xs font-bold text-[#365353]">
            <Sparkles className="h-3.5 w-3.5" /> Live Collaboration Hub
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900">Messages & Skill Swaps</h1>
        </div>

        {/* Dashboard Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[550px]">
          
          {/* Left Threads Sidebar */}
          <div className="lg:col-span-4 flex flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2 mb-3">
              Swap Threads ({swapRequests.length})
            </h3>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {swapRequests.map((swap) => {
                const partner =
                  swap.sender_id === currentUser.id
                    ? swap.receiver_profile || MOCK_PROFILES[1]
                    : swap.sender_profile || MOCK_PROFILES[1];

                const isActive = swap.id === activeSwapId;

                return (
                  <div
                    key={swap.id}
                    onClick={() => setActiveSwapId(swap.id)}
                    className={`cursor-pointer rounded-2xl p-3.5 transition-all border ${
                      isActive
                        ? 'border-[#365353] bg-[#365353]/5 shadow-sm'
                        : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={partner.avatar_url}
                        alt={partner.full_name}
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-white shadow-xs shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900 truncate">{partner.full_name}</h4>
                          {swap.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                              <Clock className="h-3 w-3" /> Pending
                            </span>
                          )}
                          {swap.status === 'accepted' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                              <UserCheck className="h-3 w-3" /> Active
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500 truncate">
                          <span className="text-[#365353] font-semibold">{swap.offered_skill}</span>
                          <ArrowRight className="h-3 w-3 text-slate-400 shrink-0" />
                          <span className="text-[#d96b43] font-semibold">{swap.requested_skill}</span>
                        </div>
                      </div>
                    </div>

                    {swap.status === 'pending' && swap.receiver_id === currentUser.id && (
                      <div className="mt-3 flex items-center gap-2 border-t border-slate-200/60 pt-2.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateStatus(swap.id, 'accepted');
                          }}
                          className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" /> Accept
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateStatus(swap.id, 'declined');
                          }}
                          className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-300"
                        >
                          <XCircle className="h-3.5 w-3.5" /> Decline
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Chat Panel */}
          <div className="lg:col-span-8 flex flex-col rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 p-4">
              <div className="flex items-center gap-3">
                <img
                  src={partnerProfile.avatar_url}
                  alt={partnerProfile.full_name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{partnerProfile.full_name}</h3>
                  <p className="text-xs text-[#365353] font-semibold">@{partnerProfile.username}</p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 rounded-full bg-[#365353]/10 px-3.5 py-1.5 text-xs border border-[#365353]/20">
                <span className="text-slate-500 font-medium">Trading:</span>
                <span className="font-bold text-[#365353]">{activeSwap.offered_skill}</span>
                <ArrowRight className="h-3 w-3 text-[#365353]" />
                <span className="font-bold text-[#365353]">{activeSwap.requested_skill}</span>
              </div>
            </div>

            {/* Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-[320px]">
              {messages.map((msg) => {
                const isMe = msg.sender_id === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                        isMe
                          ? 'bg-[#365353] text-white rounded-br-none shadow-md'
                          : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/80'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="mt-1 text-[10px] text-slate-400 font-medium">
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-slate-100 bg-slate-50/50 p-4 flex items-center gap-3"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message ${partnerProfile.full_name.split(' ')[0]}...`}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-[#365353] focus:outline-none focus:ring-2 focus:ring-[#365353]/20"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#365353] text-white shadow-md hover:bg-[#2a4242] transition-all disabled:opacity-40 shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
