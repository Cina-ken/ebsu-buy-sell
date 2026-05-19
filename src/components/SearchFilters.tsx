'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface SearchFiltersProps {
  categories: string[];
  basePath: string;
}

export default function SearchFilters({ categories, basePath }: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams]);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6 space-y-3">
      <input
        type="text"
        defaultValue={searchParams.get('search') ?? ''}
        onChange={(e) => updateParam('search', e.target.value)}
        placeholder="Search listings..."
        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <div className="flex flex-wrap gap-2">
        {categories.length > 0 && (
          <select
            value={searchParams.get('category') ?? ''}
            onChange={(e) => updateParam('category', e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        )}
        {basePath === '/marketplace' && (
          <select
            value={searchParams.get('condition') ?? ''}
            onChange={(e) => updateParam('condition', e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All Conditions</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        )}
        <input
          type="text"
          defaultValue={searchParams.get('location') ?? ''}
          onChange={(e) => updateParam('location', e.target.value)}
          placeholder="Filter by location..."
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {(searchParams.get('search') || searchParams.get('category') || searchParams.get('condition') || searchParams.get('location')) && (
          <button onClick={() => router.push(basePath)} className="text-sm text-red-500 hover:underline px-2">
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}