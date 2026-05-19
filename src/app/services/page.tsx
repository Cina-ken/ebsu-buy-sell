import prisma from '@/lib/prisma';
import { ServiceCard } from '@/components/ServiceCard';
import SearchFilters from '@/components/SearchFilters';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Services — EBSU Buy & Sell',
  description: 'Find services in the EBSU community — cleaning, tech, photography, delivery and more.',
};

interface Props {
  searchParams: Promise<{ search?: string; location?: string }>;
}

export default async function ServicesPage({ searchParams }: Props) {
  const { search, location } = await searchParams;

  const services = await prisma.service.findMany({
    where: {
      AND: [
        search ? { OR: [{ title: { contains: search, mode: 'insensitive' } }, { description: { contains: search, mode: 'insensitive' } }] } : {},
        location ? { contact: { contains: location, mode: 'insensitive' } } : {},
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Services</h1>
      <SearchFilters categories={[]} basePath="/services" />
      <p className="text-sm text-gray-500 mb-4">{services.length} service{services.length !== 1 ? 's' : ''} found</p>
      {services.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-4xl mb-4">🔧</p>
          <p className="text-lg font-medium">No services found</p>
          <p className="text-sm mt-1">Try adjusting your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => <ServiceCard key={service.id} {...service} />)}
        </div>
      )}
    </div>
  );
}