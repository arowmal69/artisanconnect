'use client';

import { toast } from "sonner";

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Star, Clock, Check, ChevronRight, Shield, RefreshCw, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function ServiceDetailsPage({ params }: { params: { id: string } }) {
  // Mock data for a creative service
  const service = {
    title: 'I will create a custom digital portrait illustration',
    description: 'I will hand-craft a stunning, high-resolution digital portrait of you, your loved ones, or your pets — in my signature vibrant illustrative style. With over 6 years of experience in digital illustration using Procreate and Photoshop, every piece is unique, full of character, and delivered as a print-ready file.',
    category: 'Illustration & Art',
    tags: ['Portraits', 'Digital Art', 'Procreate', 'Illustration'],
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    ],
    seller: {
      name: 'Maya Rivera',
      level: 'Top Rated',
      avatar: 'https://i.pravatar.cc/150?u=artist1',
      bio: 'Digital illustrator specializing in vibrant portraits, character design, and editorial art. Based in Los Angeles.',
      joined: '2021',
      reviews: 218,
      rating: 4.9,
      country: 'United States'
    },
    packages: {
      basic: {
        name: 'Simple Sketch',
        price: 45,
        description: 'A clean black-and-white digital sketch of one subject. Great for profile pictures.',
        delivery: 3,
        revisions: 1,
        features: ['1 Subject', 'B&W Line Art', 'High-Res PNG', 'Commercial Use']
      },
      standard: {
        name: 'Full Color Portrait',
        price: 90,
        description: 'Fully colored digital portrait of one subject with detailed background and shading.',
        delivery: 6,
        revisions: 3,
        features: ['1 Subject', 'Full Color', 'Background Included', 'High-Res PNG + PSD', 'Commercial Use']
      },
      premium: {
        name: 'Deluxe Commission',
        price: 180,
        description: 'A fully illustrated scene with up to 3 subjects, rich background, and frame-ready finish.',
        delivery: 12,
        revisions: 'Unlimited',
        features: ['Up to 3 Subjects', 'Full Color Scene', 'Detailed Background', 'Print-Ready File', 'Rush Option Available', 'Commercial Use']
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      <Navbar />
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-slate-500">
            <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/explore" className="hover:text-violet-600 transition-colors">{service.category}</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-slate-900 font-medium truncate">Service Details</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Service Details) */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {service.title}
              </h1>
              
              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border border-slate-200">
                    <AvatarImage src={service.seller.avatar} />
                    <AvatarFallback>{service.seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-slate-900">{service.seller.name}</span>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-[10px]">{service.seller.level}</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {service.seller.rating} 
                  <span className="text-slate-500">({service.seller.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <img src={service.images[0]} alt="Service preview" className="w-full h-auto object-cover aspect-[16/9]" />
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Service</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                {service.description}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-slate-600 border-slate-200 bg-slate-50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Seller Bio */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">About The Freelancer</h2>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Avatar className="h-24 w-24 border-2 border-violet-100">
                  <AvatarImage src={service.seller.avatar} />
                  <AvatarFallback>{service.seller.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{service.seller.name}</h3>
                  <p className="text-slate-500 mb-3">{service.seller.bio}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1"><Star className="h-4 w-4" /> {service.seller.rating} Rating</span>
                    <span>From: <strong>{service.seller.country}</strong></span>
                    <span>Member since: <strong>{service.seller.joined}</strong></span>
                  </div>
                  <Button variant="outline" className="mt-4">Contact Me</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Pricing & CTA) */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card className="border-slate-200 shadow-xl overflow-hidden">
                <Tabs defaultValue="standard" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 rounded-none h-14 bg-slate-50 p-0">
                    <TabsTrigger value="basic" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 data-[state=active]:shadow-none">Basic</TabsTrigger>
                    <TabsTrigger value="standard" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 data-[state=active]:shadow-none">Standard</TabsTrigger>
                    <TabsTrigger value="premium" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:text-violet-600 data-[state=active]:shadow-none">Premium</TabsTrigger>
                  </TabsList>
                  
                  {['basic', 'standard', 'premium'].map((tier) => {
                    const pkg = service.packages[tier as keyof typeof service.packages];
                    return (
                      <TabsContent key={tier} value={tier} className="m-0">
                        <CardHeader className="pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-xl">{pkg.name}</CardTitle>
                            <span className="text-2xl font-bold">${pkg.price}</span>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed">{pkg.description}</p>
                        </CardHeader>
                        <CardContent className="space-y-4 pb-6">
                          <div className="flex justify-between text-sm font-medium text-slate-700">
                            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {pkg.delivery} Days Delivery</span>
                            <span className="flex items-center gap-2"><RefreshCw className="h-4 w-4" /> {pkg.revisions} Revisions</span>
                          </div>
                          <div className="space-y-2 pt-2">
                            {pkg.features.map(feature => (
                              <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                                <Check className="h-4 w-4 text-green-500 shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Link href={`/orders/new`} className="w-full" onClick={(e) => {
                            e.preventDefault();
                            toast.success("Successfully hired!", {
                              description: `You have hired this service for $${pkg.price}.`
                            });
                          }}>
                            <Button className="w-full h-12 text-base font-semibold bg-violet-600 hover:bg-violet-700 transition-colors">
                              Hire Now (${pkg.price})
                            </Button>
                          </Link>
                        </CardFooter>
                      </TabsContent>
                    )
                  })}
                </Tabs>
              </Card>

              <div className="bg-slate-100 rounded-xl p-4 flex items-center justify-center gap-2 text-sm text-slate-600">
                <Shield className="h-5 w-5 text-violet-500" />
                <span>Payment is held securely in escrow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
