
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex items-center justify-between">
      {/* Logo on the left */}
      <div className="flex-shrink-0">
        <Link href="/" className="text-xl font-bold">
          EBSU Buy & Sell
        </Link>
      </div>

      {/* Centered Navigation Links */}
      <div className="flex-1 flex justify-center space-x-6">
        <Link href="/marketplace" className="hover:text-gray-300">
          Marketplace
        </Link>
        <Link href="/services" className="hover:text-gray-300">
          Services
        </Link>
        <Link href="/jobs" className="hover:text-gray-300">
          Jobs
        </Link>
      </div>

      {/* Sell Button and Hamburger on the right */}
      <div className="flex items-center space-x-4">
        <Link href="/post">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
            Sell
          </button>
        </Link>
        <button className="md:hidden text-white">☰</button>
      </div>
    </nav>
  );
}