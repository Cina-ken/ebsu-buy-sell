import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) return notFound();

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <Link href="/services" className="text-blue-500 text-sm hover:underline">← Back to Services</Link>
      <div className="bg-white rounded-lg shadow mt-4 p-5">
        <div className="flex items-start justify-between">
          <h1 className="text-xl font-bold text-gray-800">{service.title}</h1>
          <p className="text-xl font-bold text-green-600 ml-4">₦{service.rate.toLocaleString()}</p>
        </div>
        <span className="inline-block mt-2 bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full">
          {service.subcategory || service.category}
        </span>
        <div className="mt-4">
          <h2 className="font-semibold text-gray-700">Description</h2>
          <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{service.description}</p>
        </div>
        <p className="mt-4 text-sm text-gray-600">📅 <span className="font-medium">Posted:</span> {new Date(service.createdAt).toLocaleDateString()}</p>
        <a
          href={`https://wa.me/${service.contact.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 w-full block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg"
        >
          💬 Contact on WhatsApp
        </a>
      </div>
    </div>
  );
}
