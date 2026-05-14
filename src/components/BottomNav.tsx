'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, SignInButton } from '@clerk/nextjs';

export default function BottomNav() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  const links = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/marketplace', label: 'Market', icon: '🛍' },
    { href: '/services', label: 'Services', icon: '🔧' },
    { href: '/jobs', label: 'Jobs', icon: '💼' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white z-50 border-t border-gray-700">
      <div className="flex items-center justify-around py-2">
        {links.map(({ href, label, icon }) => (
          <Link key={href} href={href} className={`flex flex-col items-center text-xs px-2 py-1 ${pathname === href ? 'text-green-400' : 'text-gray-300'}`}>
            <span className="text-lg">{icon}</span>
            {label}
          </Link>
        ))}
        {isSignedIn ? (
          <Link href="/post" className={`flex flex-col items-center text-xs px-2 py-1 ${pathname === '/post' ? 'text-green-400' : 'text-gray-300'}`}>
            <span className="text-lg">➕</span>
            Sell
          </Link>
        ) : (
          <SignInButton mode="modal">
            <button className="flex flex-col items-center text-xs px-2 py-1 text-gray-300">
              <span className="text-lg">👤</span>
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}