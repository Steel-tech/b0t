'use client';

import { Navbar } from './Navbar';
import { DecorativePaws } from '@/components/ui/decorative-paws';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background relative">
      <DecorativePaws />
      <Navbar />
      <main className="w-full relative z-10">
        {children}
      </main>
    </div>
  );
}
