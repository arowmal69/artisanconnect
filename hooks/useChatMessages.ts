'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Message } from '@/lib/types';

export function useChatMessages(swapId: string, initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (!swapId) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    // 1. Fetch initial messages for this swap thread
    async function fetchMessages() {
      try {
        setIsLoading(true);
        const { data, error: fetchErr } = await supabase
          .from('messages')
          .select('*')
          .eq('swap_id', swapId)
          .order('created_at', { ascending: true });

        if (fetchErr) throw fetchErr;

        if (isMounted && data) {
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
      .channel(`realtime:messages:${swapId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `swap_id=eq.${swapId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => {
            // Prevent duplicates
            if (prev.some((m) => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to realtime messages for swap ${swapId}`);
        }
      });

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [swapId]);

  // Helper to send a message
  const sendMessage = async (senderId: string, receiverId: string, content: string) => {
    if (!content.trim()) return;

    // Optimistic UI insert
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      swap_id: swapId,
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
          swap_id: swapId,
          sender_id: senderId,
          receiver_id: receiverId,
          content: content.trim(),
        })
        .select()
        .single();

      if (sendErr) throw sendErr;

      // Replace optimistic message with persistent message
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
