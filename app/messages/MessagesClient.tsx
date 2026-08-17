'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/lib/types';
import { Send, Sparkles, MessageSquare, User } from 'lucide-react';

interface RawMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

interface MessagesClientProps {
  currentProfile: Profile;
  initialMessages: RawMessage[];
  partnerProfiles: Profile[];
}

export default function MessagesClient({ currentProfile, initialMessages, partnerProfiles }: MessagesClientProps) {
  const supabase = createClient();
  const [messages, setMessages] = useState<RawMessage[]>(initialMessages);
  const [activePartnerId, setActivePartnerId] = useState<string | null>(
    partnerProfiles[0]?.id || null
  );
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activePartnerId]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('realtime-messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const msg = payload.new as RawMessage;
        // Only add if it involves the current user
        if (msg.sender_id === currentProfile.id || msg.receiver_id === currentProfile.id) {
          setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [currentProfile.id]);

  // Get all messages for the active conversation
  const activeMessages = messages.filter(
    (m) =>
      (m.sender_id === currentProfile.id && m.receiver_id === activePartnerId) ||
      (m.sender_id === activePartnerId && m.receiver_id === currentProfile.id)
  );

  const activePartner = partnerProfiles.find((p) => p.id === activePartnerId);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activePartnerId || isSending) return;

    setIsSending(true);
    const content = inputMessage.trim();
    setInputMessage('');

    // Optimistic update
    const tempMsg: RawMessage = {
      id: `temp-${Date.now()}`,
      sender_id: currentProfile.id,
      receiver_id: activePartnerId,
      content,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMsg]);

    const { data, error } = await supabase
      .from('messages')
      .insert({ sender_id: currentProfile.id, receiver_id: activePartnerId, content })
      .select()
      .single();

    if (!error && data) {
      setMessages((prev) => prev.map((m) => m.id === tempMsg.id ? data : m));
    }
    setIsSending(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      <Navbar />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-violet" style={{ width: 400, height: 400, top: '5%', right: '-5%', opacity: 0.12 }} />
        <div className="orb orb-indigo" style={{ width: 300, height: 300, bottom: '10%', left: '-5%', opacity: 0.1 }} />
      </div>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col relative z-10">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 glass-violet rounded-full px-3.5 py-1.5 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-xs font-bold text-violet-300">Messages & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Inbox</h1>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-[600px] animate-fade-in animate-delay-100">

          {/* LEFT: Conversation List */}
          <div className="lg:col-span-4 glass rounded-3xl p-4 flex flex-col" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 px-1">
              Conversations ({partnerProfiles.length})
            </h3>

            {partnerProfiles.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-10">
                <MessageSquare className="h-10 w-10 text-slate-600 mb-3" />
                <p className="text-sm text-slate-500 font-medium">No conversations yet</p>
                <p className="text-xs text-slate-600 mt-1">Hire a freelancer to start a conversation</p>
              </div>
            ) : (
              <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                {partnerProfiles.map((partner) => {
                  const isActive = partner.id === activePartnerId;
                  // Get last message with this partner
                  const partnerMsgs = messages.filter(
                    (m) => (m.sender_id === partner.id && m.receiver_id === currentProfile.id) ||
                            (m.sender_id === currentProfile.id && m.receiver_id === partner.id)
                  );
                  const lastMsg = partnerMsgs[partnerMsgs.length - 1];

                  return (
                    <button
                      key={partner.id}
                      onClick={() => setActivePartnerId(partner.id)}
                      className="w-full text-left rounded-2xl p-4 transition-all duration-200"
                      style={{
                        background: isActive ? 'rgba(124,58,237,0.15)' : 'transparent',
                        border: `1px solid ${isActive ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.05)'}`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          {partner.avatar_url ? (
                            <img src={partner.avatar_url} alt={partner.full_name} className="h-11 w-11 rounded-xl object-cover ring-1 ring-white/10" />
                          ) : (
                            <div className="h-11 w-11 rounded-xl flex items-center justify-center text-sm font-black text-white" style={{ background: 'rgba(124,58,237,0.3)' }}>
                              {(partner.full_name || partner.username || '?')[0].toUpperCase()}
                            </div>
                          )}
                          {isActive && <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#0a0a0f]" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-black text-white truncate">{partner.full_name || partner.username}</h4>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">{lastMsg?.content || 'No messages yet'}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Chat Panel */}
          <div className="lg:col-span-8 glass rounded-3xl flex flex-col overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            {activePartner ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center gap-3 p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                  {activePartner.avatar_url ? (
                    <img src={activePartner.avatar_url} alt={activePartner.full_name} className="h-10 w-10 rounded-xl object-cover ring-1 ring-violet-500/30" />
                  ) : (
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-black text-white" style={{ background: 'rgba(124,58,237,0.3)' }}>
                      {(activePartner.full_name || activePartner.username || '?')[0].toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-black text-white">{activePartner.full_name || activePartner.username}</h3>
                    <p className="text-xs text-slate-500">@{activePartner.username}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[380px]">
                  {activeMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-16">
                      <User className="h-10 w-10 text-slate-600 mb-3" />
                      <p className="text-sm text-slate-500 font-medium">Start the conversation!</p>
                      <p className="text-xs text-slate-600 mt-1">Send a message to {activePartner.full_name || activePartner.username}</p>
                    </div>
                  ) : (
                    activeMessages.map((msg) => {
                      const isMe = msg.sender_id === currentProfile.id;
                      return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in`}>
                          <div
                            className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isMe ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
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
                    })
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSend}
                  className="flex items-center gap-3 p-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`Message ${activePartner.full_name?.split(' ')[0] || activePartner.username}...`}
                    className="input-dark flex-1 rounded-2xl px-4 py-3 text-sm text-white"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isSending}
                    className="h-11 w-11 shrink-0 rounded-2xl text-white flex items-center justify-center transition-all disabled:opacity-30"
                    style={{
                      background: inputMessage.trim() ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'rgba(124,58,237,0.2)',
                      boxShadow: inputMessage.trim() ? '0 4px 15px rgba(124,58,237,0.4)' : 'none',
                    }}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                <MessageSquare className="h-14 w-14 text-slate-700 mb-4" />
                <p className="text-white font-bold text-lg mb-2">No conversation selected</p>
                <p className="text-slate-500 text-sm">Select a conversation from the left, or hire a freelancer to start one.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
