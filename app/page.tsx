'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Search, Star, Clock, ChevronRight, TrendingUp, Code, Database, Smartphone, Cpu, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const CATEGORIES = [
  { name: 'Web Development', icon: Code, count: '1,245' },
  { name: 'Cloud Architecture', icon: Database, count: '853' },
  { name: 'Mobile Apps', icon: Smartphone, count: '942' },
  { name: 'AI/ML Engineering', icon: Cpu, count: '631' },
];

const TRENDING_SERVICES = [
  {
    id: '1',
    title: 'I will build a full-stack Next.js web application',
    seller: { name: 'Alex Johnson', level: 'Top Rated', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    rating: 4.9,
    reviews: 124,
    price: 450,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80',
    delivery: 7
  },
  {
    id: '2',
    title: 'I will design and deploy scalable AWS architecture',
    seller: { name: 'Sarah Chen', level: 'Level 2', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    rating: 5.0,
    reviews: 89,
    price: 800,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80',
    delivery: 5
  },
  {
    id: '3',
    title: 'I will create a custom AI chatbot with OpenAI',
    seller: { name: 'David Kim', level: 'Top Rated', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
    rating: 4.8,
    reviews: 215,
    price: 300,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80',
    delivery: 3
  },
  {
    id: '4',
    title: 'I will develop a cross-platform React Native app',
    seller: { name: 'Maria Garcia', level: 'Level 2', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704g' },
    rating: 4.7,
    reviews: 67,
    price: 600,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&q=80',
    delivery: 10
  }
];

const TOP_SELLERS = [
  { name: 'Alex Johnson', role: 'Full-Stack Engineer', skills: ['React', 'Node.js', 'PostgreSQL'], rating: 4.9, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { name: 'Sarah Chen', role: 'Cloud Architect', skills: ['AWS', 'Docker', 'Kubernetes'], rating: 5.0, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
  { name: 'David Kim', role: 'AI Specialist', skills: ['Python', 'PyTorch', 'OpenAI API'], rating: 4.8, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
];

export default function MarketplaceHome() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Find the perfect <span className="text-indigo-400">tech talent</span> for your next project.
            </h1>
            <p className="text-xl text-slate-300 font-medium max-w-2xl">
              Connect with top-tier freelance developers, cloud architects, and AI engineers. Build faster, scale smarter.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl bg-white rounded-2xl shadow-xl flex items-center p-2 mt-8">
              <Search className="h-6 w-6 text-slate-400 ml-4" />
              <Input 
                type="text" 
                placeholder="Try 'React Native expert' or 'AWS deployment'" 
                className="border-0 shadow-none text-lg h-14 focus-visible:ring-0 px-4 flex-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button size="lg" className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg font-semibold transition-all">
                Search
              </Button>
            </div>
            
            <div className="flex items-center gap-3 pt-4">
              <span className="text-sm font-medium text-slate-400">Popular:</span>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer">React</Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer">Python</Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer">AWS</Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer">UI/UX</Badge>
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
            <Card key={category.name} className="group hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer border-slate-200 bg-white">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <category.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900">{category.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{category.count} skills</p>
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
              <TrendingUp className="h-7 w-7 text-indigo-500" /> Trending Services
            </h2>
            <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
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
                    <h3 className="font-semibold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
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

      {/* Top Rated Sellers */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Top-Rated Talent</h2>
          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">Work with the best freelance professionals verified by our community.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOP_SELLERS.map((seller) => (
            <Card key={seller.name} className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4 ring-4 ring-indigo-50">
                  <AvatarImage src={seller.avatar} />
                  <AvatarFallback>{seller.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1 mb-1">
                  <h3 className="font-bold text-xl text-slate-900">{seller.name}</h3>
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-indigo-600 font-medium text-sm mb-4">{seller.role}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {seller.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="text-slate-600 border-slate-200">{skill}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full text-amber-700 font-semibold text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {seller.rating} Top Rated
                </div>
              </CardContent>
              <CardFooter className="px-8 pb-8 pt-0">
                <Button className="w-full" variant="outline">View Profile</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
