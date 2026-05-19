import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  condition: string;
  imageUrl: string | null;
  location: string;
  category: string;
  createdAt: Date;
}

export function ProductCard({ id, title, price, condition, imageUrl, location, category, createdAt }: ProductCardProps) {
  return (
    <Link href={`/marketplace/${id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
        <div className="relative w-full h-48">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
          <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full ${condition === 'new' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {condition === 'new' ? 'New' : 'Used'}
          </span>
        </div>
        <div className="p-3">
          <h2 className="font-semibold text-gray-800 truncate">{title}</h2>
          <p className="text-green-600 font-bold mt-1">₦{price.toLocaleString()}</p>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>📍 {location}</span>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
          <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{category}</span>
        </div>
      </div>
    </Link>
  );
}
