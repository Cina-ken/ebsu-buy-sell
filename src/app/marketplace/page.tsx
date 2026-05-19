import prisma from '@/lib/prisma';
import { ProductCard } from '@/components/ProductCard';
import SearchFilters from '@/components/SearchFilters';
import { categories } from '@/data/categories';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Marketplace — EBSU Buy & Sell',
  description: 'Browse products for sale in the EBSU community. Find electronics, fashion, phones, furniture and more.',
};

interface Props {
  searchParams: Promise<{ search?: string; category?: string; condition?: string; location?: string }>;
}

export default async function MarketplacePage({ searchParams }: Props) {
  const { search, category, condition, location } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      AND: [
        search ? { OR: [{ title: { contains: search, mode: 'insensitive' } }, { description: { contains: search, mode: 'insensitive' } }] } : {},
        category ? { category } : {},
        condition ? { condition } : {},
        location ? { location: { contains: location, mode: 'insensitive' } } : {},
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  const productCategories = categories
    .filter((c) => !['Jobs', 'Services'].includes(c.name))
    .map((c) => c.name);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Marketplace</h1>
      <SearchFilters categories={productCategories} basePath="/marketplace" />
      <p className="text-sm text-gray-500 mb-4">{products.length} listing{products.length !== 1 ? 's' : ''} found</p>
      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-4xl mb-4">🛍</p>
          <p className="text-lg font-medium">No listings found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => <ProductCard key={product.id} {...product} />)}
        </div>
      )}
    </div>
  );
}