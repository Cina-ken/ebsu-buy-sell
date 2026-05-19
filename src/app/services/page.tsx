import prisma from '@/lib/prisma';
import { ServiceCard } from '@/components/ServiceCard';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Services</h1>
      {services.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-4xl mb-4">🔧</p>
          <p className="text-lg font-medium">No services listed yet</p>
          <p className="text-sm mt-1">Be the first to offer a service!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => <ServiceCard key={service.id} {...service} />)}
        </div>
      )}
    </div>
  );
}
