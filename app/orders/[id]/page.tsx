'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Paperclip, Send, Clock, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

export default function OrderWorkspacePage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState('');
  
  // Mock Data
  const order = {
    id: params.id,
    status: 'active', // pending, active, delivered, completed
    serviceTitle: 'I will build a full-stack Next.js web application',
    price: 900,
    deliveryDate: '2026-08-10',
    seller: {
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      role: 'Seller'
    },
    buyer: {
      name: 'You',
      avatar: 'https://i.pravatar.cc/150?u=your_avatar',
      role: 'Buyer'
    },
    requirements: 'Need a dashboard with authentication, database integration, and analytics charts. Must use Tailwind CSS.',
    messages: [
      { id: 1, sender: 'Alex Johnson', time: '10:00 AM', text: 'Hi! I received your requirements. I will start working on the UI first.', isMe: false },
      { id: 2, sender: 'You', time: '10:15 AM', text: 'Great! Let me know if you need any API keys for the analytics.', isMe: true },
      { id: 3, sender: 'Alex Johnson', time: '11:30 AM', text: 'I have attached the initial wireframes for the dashboard.', isMe: false, attachment: 'dashboard_wireframes.pdf' },
    ]
  };

  const statusMap: Record<string, { label: string, color: string, step: number }> = {
    'pending': { label: 'Requirements Pending', color: 'bg-amber-100 text-amber-800', step: 1 },
    'active': { label: 'In Progress', color: 'bg-blue-100 text-blue-800', step: 2 },
    'delivered': { label: 'In Review', color: 'bg-purple-100 text-purple-800', step: 3 },
    'completed': { label: 'Completed', color: 'bg-emerald-100 text-emerald-800', step: 4 },
  };

  const currentStatus = statusMap[order.status];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center px-4 sm:px-6 shrink-0 z-10">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="mr-4 text-slate-500 hover:text-slate-900">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-slate-900 line-clamp-1">{order.serviceTitle}</h1>
            <p className="text-xs text-slate-500">Order #{order.id} • ${order.price}</p>
          </div>
          <Badge className={currentStatus.color}>{currentStatus.label}</Badge>
        </div>
      </header>

      {/* Main Workspace - Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Pane - Order Details & Progress */}
        <div className="w-full lg:w-1/3 bg-white border-r border-slate-200 overflow-y-auto hidden md:block">
          <div className="p-6 space-y-8">
            
            {/* Timeline / Progress */}
            <div>
              <h2 className="font-bold text-slate-900 mb-4">Order Progress</h2>
              <div className="relative pl-6 border-l-2 border-slate-100 space-y-6">
                {[
                  { label: 'Requirements Submitted', desc: 'Buyer provided details', active: currentStatus.step >= 1 },
                  { label: 'Order in Progress', desc: 'Seller is working on it', active: currentStatus.step >= 2 },
                  { label: 'Delivery & Review', desc: 'Awaiting buyer approval', active: currentStatus.step >= 3 },
                  { label: 'Order Completed', desc: 'Payment released', active: currentStatus.step === 4 },
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[35px] h-6 w-6 rounded-full flex items-center justify-center border-4 border-white ${step.active ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                      {step.active && <CheckCircle2 className="h-4 w-4 text-white" />}
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${step.active ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                      <p className="text-xs text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <Card className="border-slate-200 shadow-sm bg-slate-50">
              <CardContent className="p-4 flex items-start gap-3">
                <Clock className="h-5 w-5 text-indigo-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Expected Delivery</p>
                  <p className="text-indigo-600 font-bold">{order.deliveryDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements Box */}
            <div>
              <h2 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Project Requirements</h2>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-600">
                {order.requirements}
              </div>
            </div>
            
          </div>
        </div>

        {/* Right Pane - Chat Workspace */}
        <div className="flex-1 flex flex-col bg-[#F8FAFC]">
          {/* Chat Header */}
          <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center shrink-0">
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src={order.seller.avatar} />
              <AvatarFallback>{order.seller.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-slate-900 text-sm">{order.seller.name}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-center">
              <span className="bg-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full font-medium">Order Started</span>
            </div>
            
            {order.messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-end gap-2 max-w-[80%]">
                  {!msg.isMe && (
                    <Avatar className="h-6 w-6 shrink-0 mb-1">
                      <AvatarImage src={order.seller.avatar} />
                      <AvatarFallback>{order.seller.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex flex-col gap-1">
                    <div className={`p-4 rounded-2xl ${msg.isMe ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'}`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      {msg.attachment && (
                        <div className={`mt-3 p-2 rounded-lg flex items-center gap-2 text-sm border ${msg.isMe ? 'bg-indigo-700/50 border-indigo-500 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                          <FileText className="h-4 w-4 shrink-0" />
                          <span className="truncate">{msg.attachment}</span>
                        </div>
                      )}
                    </div>
                    <span className={`text-[10px] text-slate-400 ${msg.isMe ? 'text-right' : 'text-left'} px-1`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Area */}
          <div className="bg-white border-t border-slate-200 p-4 shrink-0">
            <div className="max-w-4xl mx-auto flex items-end gap-2">
              <Button variant="ghost" size="icon" className="shrink-0 h-10 w-10 text-slate-500 hover:text-indigo-600 rounded-full hover:bg-indigo-50">
                <Paperclip className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <Textarea 
                  placeholder="Type your message here..." 
                  className="min-h-[44px] h-[44px] max-h-32 resize-none rounded-xl bg-slate-50 border-slate-200 py-3 px-4 focus-visible:ring-1 focus-visible:ring-indigo-500 shadow-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      // Send action would go here
                      setMessage('');
                    }
                  }}
                />
              </div>
              <Button size="icon" className="shrink-0 h-10 w-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md">
                <Send className="h-4 w-4 ml-0.5" />
              </Button>
            </div>
            <p className="text-center text-xs text-slate-400 mt-2 flex items-center justify-center gap-1">
              <AlertCircle className="h-3 w-3" /> Keep communication inside the workspace for safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
