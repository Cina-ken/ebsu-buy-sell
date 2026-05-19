import Link from 'next/link';

interface JobCardProps {
  id: string;
  title: string;
  description: string;
  company: string;
  contact: string;
  category: string;
  subcategory: string;
  createdAt: Date;
}

export function JobCard({ id, title, description, company, contact, category, subcategory, createdAt }: JobCardProps) {
  return (
    <Link href={`/jobs/${id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-gray-800 truncate">{title}</h2>
            <p className="text-sm text-blue-600 font-medium mt-1">{company}</p>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
          </div>
          <span className="ml-2 bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-full whitespace-nowrap">{subcategory || category}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>📞 {contact}</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}
