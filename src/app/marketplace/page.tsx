import prisma from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function MarketplacePage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Marketplace</h1>
      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-4xl mb-4">🛍</p>
          <p className="text-lg font-medium">No listings yet</p>
          <p className="text-sm mt-1">Be the first to post something!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => <ProductCard key={product.id} {...product} />)}
        </div>
      )}
    </div>
  );
}
