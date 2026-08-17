import './globals.css';
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArtisanConnect - 1-on-1 Artist Skill Exchange Platform',
  description: 'Trade creative skills peer-to-peer. Teach 3D Modeling, Learn Oil Painting, Sound Design, UI/UX and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAFAFA] text-[#111111] antialiased selection:bg-black selection:text-white`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
