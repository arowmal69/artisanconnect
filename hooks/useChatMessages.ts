'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Message } from '@/lib/types';

export function useChatMessages(threadId: string, initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (!threadId) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    // 1. Fetch initial messages for this thread
    async function fetchMessages() {
      try {
        setIsLoading(true);
        const { data, error: fetchErr } = await supabase
          .from('messages')
          .select('*')
          .or(`order_id.eq.${threadId},sender_id.eq.${threadId},receiver_id.eq.${threadId}`)
          .order('created_at', { ascending: true });

        if (fetchErr) throw fetchErr;

        if (isMounted && data && data.length > 0) {
          setMessages(data as Message[]);
        }
      } catch (err: any) {
        console.warn('Realtime fetch fallback:', err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchMessages();

    // 2. Subscribe to Realtime INSERT events on messages table
    const channel = supabase
      .channel(`realtime:messages:${threadId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [threadId]);

  // Helper to send a message
  const sendMessage = async (senderId: string, receiverId: string, content: string) => {
    if (!content.trim()) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      sender_id: senderId,
      receiver_id: receiverId,
      content: content.trim(),
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      const { data, error: sendErr } = await supabase
        .from('messages')
        .insert({
          sender_id: senderId,
          receiver_id: receiverId,
          content: content.trim(),
        })
        .select()
        .single();

      if (sendErr) throw sendErr;

      if (data) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempId ? (data as Message) : msg))
        );
      }
    } catch (err: any) {
      console.error('Failed to send message:', err.message);
      setError(err.message);
    }
  };

  return { messages, isLoading, error, sendMessage };
}
