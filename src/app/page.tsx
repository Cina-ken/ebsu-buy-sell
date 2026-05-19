import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { ServiceCard } from '@/components/ServiceCard';
import { JobCard } from '@/components/JobCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [products, services, jobs] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: 'desc' }, take: 4 }),
    prisma.service.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.job.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gray-800 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">EBSU Buy & Sell</h1>
        <p className="text-gray-300 mb-6">Buy, sell, find services and jobs in the EBSU community</p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link href="/marketplace" className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium">Browse Market</Link>
          <Link href="/post" className="bg-white hover:bg-gray-100 text-gray-800 px-5 py-2 rounded-lg font-medium">+ Post a Listing</Link>
        </div>
      </div>

      {/* Category quick links */}
      <div className="bg-white border-b py-4 px-4">
        <div className="container mx-auto flex gap-3 overflow-x-auto">
          {['Marketplace', 'Services', 'Jobs', 'Electronics', 'Fashion', 'Phones & Tablets', 'Property', 'Vehicles'].map((cat) => (
            <Link
              key={cat}
              href={['Marketplace', 'Services', 'Jobs'].includes(cat) ? `/${cat.toLowerCase()}` : `/marketplace?category=${encodeURIComponent(cat)}`}
              className="whitespace-nowrap text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-10">
        {/* Latest Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Latest Listings</h2>
            <Link href="/marketplace" className="text-sm text-blue-500 hover:underline">See all →</Link>
          </div>
          {products.length === 0 ? (
            <p className="text-gray-400 text-sm">No listings yet. <Link href="/post" className="text-blue-500 hover:underline">Be the first to post!</Link></p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => <ProductCard key={product.id} {...product} />)}
            </div>
          )}
        </section>

        {/* Services */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Services</h2>
            <Link href="/services" className="text-sm text-blue-500 hover:underline">See all →</Link>
          </div>
          {services.length === 0 ? (
            <p className="text-gray-400 text-sm">No services yet. <Link href="/post" className="text-blue-500 hover:underline">Offer yours!</Link></p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => <ServiceCard key={service.id} {...service} />)}
            </div>
          )}
        </section>

        {/* Jobs */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Latest Jobs</h2>
            <Link href="/jobs" className="text-sm text-blue-500 hover:underline">See all →</Link>
          </div>
          {jobs.length === 0 ? (
            <p className="text-gray-400 text-sm">No jobs yet. <Link href="/post" className="text-blue-500 hover:underline">Post a vacancy!</Link></p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => <JobCard key={job.id} {...job} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
