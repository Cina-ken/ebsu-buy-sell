'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth, UserButton, SignInButton } from '@clerk/nextjs';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex items-center justify-between relative">
      <div className="flex-shrink-0">
        <Link href="/" className="text-xl font-bold">EBSU Buy &amp; Sell</Link>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="hidden md:flex space-x-6">
          <Link href="/marketplace" className="hover:text-gray-300">Marketplace</Link>
          <Link href="/services" className="hover:text-gray-300">Services</Link>
          <Link href="/jobs" className="hover:text-gray-300">Jobs</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">☰</button>
          {isOpen && (
            <div className="absolute top-full left-0 w-full bg-gray-800 z-10">
              <Link href="/marketplace" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsOpen(false)}>Marketplace</Link>
              <Link href="/services" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsOpen(false)}>Services</Link>
              <Link href="/jobs" className="block px-4 py-2 hover:bg-gray-700" onClick={() => setIsOpen(false)}>Jobs</Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {isSignedIn ? (
          <>
            <Link href="/post">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm">+ Sell</button>
            </Link>
            <UserButton />
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Sign In</button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}