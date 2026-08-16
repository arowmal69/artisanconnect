'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useChatMessages } from '@/hooks/useChatMessages';
import { MOCK_PROFILES } from '@/lib/mock-data';
import { Profile } from '@/lib/types';
import { Send, Sparkles, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ConversationThread {
  id: string;
  partner: Profile;
  projectTopic: string;
  status: 'active' | 'inquiry' | 'completed';
  lastMessage: string;
  time: string;
}

const STATUS_CONFIG = {
  active: { label: 'Active', color: 'rgba(16,185,129,0.15)', textColor: '#34d399', border: 'rgba(16,185,129,0.3)' },
  inquiry: { label: 'Inquiry', color: 'rgba(124,58,237,0.15)', textColor: '#a78bfa', border: 'rgba(124,58,237,0.3)' },
  completed: { label: 'Completed', color: 'rgba(99,102,241,0.15)', textColor: '#818cf8', border: 'rgba(99,102,241,0.3)' },
};

export default function MessagesDashboard() {
  const currentUser: Profile = MOCK_PROFILES[0];

  const [threads, setThreads] = useState<ConversationThread[]>([
    {
      id: 'thread-1',
      partner: MOCK_PROFILES[1],
      projectTopic: 'Oil Painting Landscape Commission',
      status: 'active',
      lastMessage: 'Hi Elena! I can walk you through the custom canvas sizing options.',
      time: '10:12 AM',
    },
    {
      id: 'thread-2',
      partner: MOCK_PROFILES[2],
      projectTopic: 'Vocal Track for Indie Game Intro',
      status: 'inquiry',
      lastMessage: 'Let me know the tempo and key for the vocal session recording!',
      time: 'Yesterday',
    },
    {
      id: 'thread-3',
      partner: MOCK_PROFILES[3],
      projectTopic: 'Live Event Choreography Routine',
      status: 'inquiry',
      lastMessage: 'Sounds great! I have sent over the demo video preview.',
      time: 'Feb 12',
    },
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>('thread-1');
  const [inputMessage, setInputMessage] = useState<string>('');

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];
  const partnerProfile = activeThread.partner;

  const initialThreadMessages = [
    {
      id: 'm1',
      sender_id: partnerProfile.id,
      receiver_id: currentUser.id,
      content: `Hello! Thanks for reaching out regarding the ${activeThread.projectTopic}. Let me know what details or references you have in mind!`,
      created_at: '2026-02-20T10:05:00Z',
    },
    {
      id: 'm2',
      sender_id: currentUser.id,
      receiver_id: partnerProfile.id,
      content: 'Hi! I am looking to commission a high quality piece for an upcoming project release.',
      created_at: '2026-02-20T10:12:00Z',
    },
  ];

  const { messages, sendMessage } = useChatMessages(activeThreadId, initialThreadMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendMessage(currentUser.id, partnerProfile.id, inputMessage);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      <Navbar />

      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-violet" style={{ width: 400, height: 400, top: '5%', right: '-5%', opacity: 0.12 }} />
        <div className="orb orb-indigo" style={{ width: 300, height: 300, bottom: '10%', left: '-5%', opacity: 0.1 }} />
      </div>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col relative z-10">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass-violet rounded-full px-3.5 py-1.5 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-xs font-bold text-violet-300">Project Messages & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Inbox & Workspaces
          </h1>
        </div>

        {/* Main Panel */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[600px] animate-fade-in animate-delay-100">

          {/* ===== LEFT: THREAD LIST ===== */}
          <div className="lg:col-span-4 glass rounded-3xl p-4 flex flex-col" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">
                Conversations ({threads.length})
              </h3>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto pr-1">
              {threads.map((thread) => {
                const isActive = thread.id === activeThreadId;
                const status = STATUS_CONFIG[thread.status];

                return (
                  <button
                    key={thread.id}
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`w-full text-left rounded-2xl p-4 transition-all duration-200 ${
                      isActive ? 'glow-violet-sm' : 'hover:bg-white/3'
                    }`}
                    style={{
                      background: isActive ? 'rgba(124,58,237,0.15)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.05)'}`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={thread.partner.avatar_url}
                          alt={thread.partner.full_name}
                          className="h-11 w-11 rounded-xl object-cover ring-1 ring-white/10"
                        />
                        {isActive && (
                          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#0a0a0f]" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-black text-white truncate">{thread.partner.full_name}</h4>
                          <span className="text-[10px] text-slate-500 font-medium shrink-0 ml-2">{thread.time}</span>
                        </div>

                        <p className="text-xs font-semibold truncate mb-1" style={{ color: '#a78bfa' }}>
                          {thread.projectTopic}
                        </p>

                        <div className="flex items-center justify-between">
                          <p className="text-[11px] text-slate-500 truncate flex-1">{thread.lastMessage}</p>
                          <span
                            className="ml-2 shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: status.color, color: status.textColor, border: `1px solid ${status.border}` }}
                          >
                            {status.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== RIGHT: CHAT PANEL ===== */}
          <div className="lg:col-span-8 glass rounded-3xl flex flex-col overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-3">
                <img
                  src={partnerProfile.avatar_url}
                  alt={partnerProfile.full_name}
                  className="h-10 w-10 rounded-xl object-cover ring-1 ring-violet-500/30"
                />
                <div>
                  <h3 className="text-sm font-black text-white">{partnerProfile.full_name}</h3>
                  <p className="text-xs text-slate-500">@{partnerProfile.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 glass-violet rounded-full px-3.5 py-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-violet-400" />
                  <span className="text-xs font-semibold text-violet-300 max-w-[180px] truncate">
                    {activeThread.projectTopic}
                  </span>
                </div>
                <Link href={`/profile/${partnerProfile.id}`}>
                  <button
                    className="text-xs font-bold text-violet-400 hover:text-white px-3 py-1.5 rounded-xl transition-all flex items-center gap-1"
                    style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)' }}
                  >
                    Profile <ArrowRight className="h-3 w-3" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 min-h-[380px]">
              {messages.map((msg) => {
                const isMe = msg.sender_id === currentUser.id;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in`}>
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        isMe ? 'rounded-br-sm' : 'rounded-bl-sm'
                      }`}
                      style={
                        isMe
                          ? { background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: 'white', boxShadow: '0 4px 15px rgba(124,58,237,0.35)' }
                          : { background: 'rgba(255,255,255,0.06)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.08)' }
                      }
                    >
                      {msg.content}
                    </div>
                    <span className="mt-1 text-[10px] text-slate-600 font-medium">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-3 p-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message ${partnerProfile.full_name?.split(' ')[0]} about your project...`}
                className="input-dark flex-1 rounded-2xl px-4 py-3 text-sm text-white"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="h-11 w-11 shrink-0 rounded-2xl text-white flex items-center justify-center transition-all disabled:opacity-30"
                style={{
                  background: inputMessage.trim() ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'rgba(124,58,237,0.2)',
                  boxShadow: inputMessage.trim() ? '0 4px 15px rgba(124,58,237,0.4)' : 'none',
                }}
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
