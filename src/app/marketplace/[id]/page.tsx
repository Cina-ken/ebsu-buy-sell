import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return notFound();

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <Link href="/marketplace" className="text-blue-500 text-sm hover:underline">← Back to Marketplace</Link>
      <div className="bg-white rounded-lg shadow mt-4 overflow-hidden">
        <div className="relative w-full h-64">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full ${product.condition === 'new' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {product.condition === 'new' ? 'New' : 'Used'}
          </span>
        </div>
        <div className="p-5">
          <h1 className="text-xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-2xl font-bold text-green-600 mt-2">₦{product.price.toLocaleString()}</p>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>📍 <span className="font-medium">Location:</span> {product.location}</p>
            <p>🏷 <span className="font-medium">Category:</span> {product.category} — {product.subcategory}</p>
            <p>📅 <span className="font-medium">Posted:</span> {new Date(product.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="mt-4">
            <h2 className="font-semibold text-gray-700">Description</h2>
            <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{product.description}</p>
          </div>
          <a
            href={`https://wa.me/${product.contact.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg"
          >
            💬 Contact on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
