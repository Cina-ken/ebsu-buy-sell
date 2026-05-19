import Link from 'next/link';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  rate: number;
  contact: string;
  category: string;
  subcategory: string;
  createdAt: Date;
}

export function ServiceCard({ id, title, description, rate, contact, category, subcategory, createdAt }: ServiceCardProps) {
  return (
    <Link href={`/services/${id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-gray-800 truncate">{title}</h2>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
          </div>
          <span className="ml-2 text-green-600 font-bold whitespace-nowrap">₦{rate.toLocaleString()}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{subcategory || category}</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <p className="mt-2 text-xs text-gray-500">📞 {contact}</p>
      </div>
    </Link>
  );
}
