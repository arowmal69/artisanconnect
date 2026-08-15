'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useChatMessages } from '@/hooks/useChatMessages';
import { MOCK_PROFILES } from '@/lib/mock-data';
import { Profile } from '@/lib/types';
import {
  Send,
  Sparkles,
  Briefcase,
  UserCheck,
  Tag,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

interface ConversationThread {
  id: string;
  partner: Profile;
  projectTopic: string;
  status: 'active' | 'inquiry' | 'completed';
  lastMessage: string;
  time: string;
}

export default function MessagesDashboard() {
  const currentUser: Profile = MOCK_PROFILES[0];

  const [threads, setThreads] = useState<ConversationThread[]>([
    {
      id: 'thread-1',
      partner: MOCK_PROFILES[1], // Marcus Chen
      projectTopic: 'Oil Painting Landscape Commission',
      status: 'active',
      lastMessage: 'Hi Elena! I can walk you through the custom canvas sizing options.',
      time: '10:12 AM',
    },
    {
      id: 'thread-2',
      partner: MOCK_PROFILES[2], // Aiden Cole
      projectTopic: 'Vocal Track for Indie Game Intro',
      status: 'inquiry',
      lastMessage: 'Let me know the tempo and key for the vocal session recording!',
      time: 'Yesterday',
    },
    {
      id: 'thread-3',
      partner: MOCK_PROFILES[3], // Sofia Diaz
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3.5 py-1 text-xs font-bold text-violet-700 border border-violet-100">
            <Sparkles className="h-3.5 w-3.5" /> Project Messages & Inquiries
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900">Inbox & Workspaces</h1>
        </div>

        {/* Dashboard Container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[580px]">
          
          {/* Left Threads Sidebar */}
          <div className="lg:col-span-4 flex flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-3">
              Conversations ({threads.length})
            </h3>

            <div className="flex-1 space-y-2 overflow-y-auto pr-1">
              {threads.map((thread) => {
                const isActive = thread.id === activeThreadId;

                return (
                  <div
                    key={thread.id}
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`cursor-pointer rounded-2xl p-3.5 transition-all border ${
                      isActive
                        ? 'border-violet-600 bg-violet-50/70 shadow-sm'
                        : 'border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-slate-100/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={thread.partner.avatar_url}
                        alt={thread.partner.full_name}
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-white shadow-xs shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-sm font-bold text-slate-900 truncate">{thread.partner.full_name}</h4>
                          <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-1">{thread.time}</span>
                        </div>

                        <p className="text-xs font-semibold text-violet-700 truncate mb-1">
                          {thread.projectTopic}
                        </p>

                        <p className="text-[11px] text-slate-500 truncate">
                          {thread.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Chat Panel */}
          <div className="lg:col-span-8 flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Top Chat Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 p-4">
              <div className="flex items-center gap-3">
                <img
                  src={partnerProfile.avatar_url}
                  alt={partnerProfile.full_name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{partnerProfile.full_name}</h3>
                  <p className="text-xs text-slate-500">@{partnerProfile.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-violet-50 px-3.5 py-1.5 text-xs border border-violet-100">
                  <Briefcase className="h-3.5 w-3.5 text-violet-600" />
                  <span className="font-semibold text-violet-900">{activeThread.projectTopic}</span>
                </div>

                <Link
                  href={`/profile/${partnerProfile.id}`}
                  className="text-xs font-bold text-violet-600 hover:text-violet-700 bg-white border border-violet-200 px-3 py-1.5 rounded-xl transition-colors"
                >
                  View Profile
                </Link>
              </div>
            </div>

            {/* Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-[350px]">
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
                          ? 'bg-violet-600 text-white rounded-br-none shadow-sm'
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
                placeholder={`Message ${partnerProfile.full_name.split(' ')[0]} about your project...`}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md hover:bg-violet-700 transition-all disabled:opacity-40 shrink-0"
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
