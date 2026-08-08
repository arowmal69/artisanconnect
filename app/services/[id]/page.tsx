'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Star, Clock, Check, ChevronRight, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function ServiceDetailsPage({ params }: { params: { id: string } }) {
  // Mock data for the service
  const service = {
    title: 'I will build a full-stack Next.js web application',
    description: 'I will develop a modern, fast, and scalable web application using Next.js 14, Tailwind CSS, and Supabase. With over 5 years of experience in full-stack development, I ensure clean code, responsive design, and robust backend architecture.',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'TypeScript', 'Supabase'],
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    ],
    seller: {
      name: 'Alex Johnson',
      level: 'Top Rated',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      bio: 'Full-stack developer specializing in React ecosystem and serverless backends.',
      joined: '2022',
      reviews: 124,
      rating: 4.9,
      country: 'United States'
    },
    packages: {
      basic: {
        name: 'Basic SPA',
        price: 450,
        description: 'A simple single-page application with up to 3 pages. Responsive design included.',
        delivery: 7,
        revisions: 2,
        features: ['3 Pages', 'Responsive Design', 'Source Code']
      },
      standard: {
        name: 'Full-Stack App',
        price: 900,
        description: 'Complete web app with user authentication, database integration, and up to 5 pages.',
        delivery: 14,
        revisions: 3,
        features: ['5 Pages', 'Authentication', 'Database Setup', 'Responsive Design', 'Source Code']
      },
      premium: {
        name: 'Enterprise Solution',
        price: 1500,
        description: 'Complex application with advanced features, admin panel, payment integration, and prioritized support.',
        delivery: 21,
        revisions: 'Unlimited',
        features: ['10+ Pages', 'Admin Dashboard', 'Payment Gateway', 'Priority Support', 'Source Code']
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
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="#" className="hover:text-indigo-600 transition-colors">{service.category}</Link>
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
              <h2 className="text-2xl font-bold text-slate-900 mb-6">About The Seller</h2>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Avatar className="h-24 w-24 border-2 border-indigo-100">
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
                    <TabsTrigger value="basic" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none">Basic</TabsTrigger>
                    <TabsTrigger value="standard" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none">Standard</TabsTrigger>
                    <TabsTrigger value="premium" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none">Premium</TabsTrigger>
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
                          <Link href={`/orders/new`} className="w-full">
                            <Button className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors">
                              Continue (${pkg.price})
                            </Button>
                          </Link>
                        </CardFooter>
                      </TabsContent>
                    )
                  })}
                </Tabs>
              </Card>

              <div className="bg-slate-100 rounded-xl p-4 flex items-center justify-center gap-2 text-sm text-slate-600">
                <Shield className="h-5 w-5 text-indigo-500" />
                <span>Payment is held securely in escrow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
