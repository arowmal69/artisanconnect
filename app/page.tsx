'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Search, Star, Clock, ChevronRight, TrendingUp, Palette, Music, PersonStanding, Camera, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const CATEGORIES = [
  { name: 'Illustration & Art', icon: Palette, count: '1,340' },
  { name: 'Painting', icon: Palette, count: '876' },
  { name: 'Music & Singing', icon: Music, count: '1,021' },
  { name: 'Dance & Performance', icon: PersonStanding, count: '594' },
];

const TRENDING_SERVICES = [
  {
    id: '1',
    title: 'I will create a stunning custom digital portrait illustration',
    seller: { name: 'Maya Rivera', level: 'Top Rated', avatar: 'https://i.pravatar.cc/150?u=artist1' },
    rating: 4.9,
    reviews: 218,
    price: 80,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80',
    delivery: 5
  },
  {
    id: '2',
    title: 'I will paint a custom watercolor portrait or landscape',
    seller: { name: 'Lena Park', level: 'Level 2', avatar: 'https://i.pravatar.cc/150?u=artist2' },
    rating: 5.0,
    reviews: 142,
    price: 120,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&q=80',
    delivery: 7
  },
  {
    id: '3',
    title: 'I will record a professional vocal cover or original song',
    seller: { name: 'Aiden Cole', level: 'Top Rated', avatar: 'https://i.pravatar.cc/150?u=artist3' },
    rating: 4.8,
    reviews: 307,
    price: 60,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80',
    delivery: 3
  },
  {
    id: '4',
    title: 'I will choreograph and record a custom dance performance',
    seller: { name: 'Sofia Diaz', level: 'Level 2', avatar: 'https://i.pravatar.cc/150?u=artist4' },
    rating: 4.7,
    reviews: 91,
    price: 150,
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&q=80',
    delivery: 10
  }
];

const TOP_FREELANCERS = [
  { name: 'Maya Rivera', role: 'Digital Illustrator', skills: ['Portraits', 'Character Design', 'Procreate'], rating: 4.9, avatar: 'https://i.pravatar.cc/150?u=artist1' },
  { name: 'Aiden Cole', role: 'Vocalist & Producer', skills: ['Pop', 'R&B', 'Session Recording'], rating: 5.0, avatar: 'https://i.pravatar.cc/150?u=artist3' },
  { name: 'Sofia Diaz', role: 'Dancer & Choreographer', skills: ['Contemporary', 'Hip-Hop', 'Wedding Dances'], rating: 4.8, avatar: 'https://i.pravatar.cc/150?u=artist4' },
];

export default function MarketplaceHome() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Hire the perfect <span className="text-violet-400">creative talent</span> for your next project.
            </h1>
            <p className="text-xl text-slate-300 font-medium max-w-2xl">
              Connect with talented artists, painters, singers, and dancers. Bring your vision to life with the right creative professional.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl bg-white rounded-2xl shadow-xl flex items-center p-2 mt-8">
              <Search className="h-6 w-6 text-slate-400 ml-4" />
              <Input 
                type="text" 
                placeholder="Try 'portrait painter' or 'live singer for events'" 
                className="border-0 shadow-none text-lg h-14 focus-visible:ring-0 px-4 flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button size="lg" className="h-14 px-8 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-lg font-semibold transition-all">
                Search
              </Button>
            </div>
            
            <div className="flex items-center gap-3 pt-4">
              <span className="text-sm font-medium text-slate-400">Popular:</span>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer">Illustration</Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer">Painting</Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer">Music</Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer">Dance</Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer">Murals</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Explore Categories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Card key={category.name} className="group hover:border-violet-500 hover:shadow-lg transition-all cursor-pointer border-slate-200 bg-white">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="h-12 w-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <category.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900">{category.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{category.count} freelancers</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Services */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <TrendingUp className="h-7 w-7 text-violet-500" /> Trending Services
            </h2>
            <Link href="/explore">
              <Button variant="ghost" className="text-violet-600 hover:text-violet-700">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRENDING_SERVICES.map((service) => (
              <Link href={`/services/${service.id}`} key={service.id}>
                <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 border-slate-200 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5 flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={service.seller.avatar} />
                        <AvatarFallback>{service.seller.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-slate-700">{service.seller.name}</span>
                      <Badge variant="secondary" className="ml-auto text-[10px] bg-amber-100 text-amber-800">{service.seller.level}</Badge>
                    </div>
                    <h3 className="font-semibold text-slate-900 leading-tight group-hover:text-violet-600 transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-3">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-sm text-slate-900">{service.rating}</span>
                      <span className="text-sm text-slate-500">({service.reviews})</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-0 flex items-center justify-between mt-auto">
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {service.delivery} days delivery
                    </div>
                    <div className="font-bold text-lg text-slate-900">
                      From ${service.price}
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Freelancers */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Top-Rated Freelancers</h2>
          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">Work with the best creative professionals, verified and reviewed by real clients.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOP_FREELANCERS.map((freelancer) => (
            <Card key={freelancer.name} className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4 ring-4 ring-violet-50">
                  <AvatarImage src={freelancer.avatar} />
                  <AvatarFallback>{freelancer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1 mb-1">
                  <h3 className="font-bold text-xl text-slate-900">{freelancer.name}</h3>
                  <CheckCircle className="h-4 w-4 text-violet-500" />
                </div>
                <p className="text-violet-600 font-medium text-sm mb-4">{freelancer.role}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {freelancer.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="text-slate-600 border-slate-200">{skill}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full text-amber-700 font-semibold text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {freelancer.rating} Top Rated
                </div>
              </CardContent>
              <CardFooter className="px-8 pb-8 pt-0">
                <Link href="/explore" className="w-full">
                  <Button className="w-full" variant="outline">View Profile</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
