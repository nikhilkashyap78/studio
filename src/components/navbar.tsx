'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Calendar, Hourglass } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Life Calendar', icon: Calendar },
    { href: '/time-cost', label: 'Time Cost', icon: Hourglass },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-center">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center justify-center rounded-full px-3 sm:px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                pathname === link.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
