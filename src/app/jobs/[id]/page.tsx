import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.job.findUnique({ where: { id } });

  if (!job) return notFound();

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <Link href="/jobs" className="text-blue-500 text-sm hover:underline">← Back to Jobs</Link>
      <div className="bg-white rounded-lg shadow mt-4 p-5">
        <h1 className="text-xl font-bold text-gray-800">{job.title}</h1>
        <p className="text-blue-600 font-medium mt-1">{job.company}</p>
        <span className="inline-block mt-2 bg-purple-50 text-purple-600 text-xs px-2 py-1 rounded-full">
          {job.subcategory || job.category}
        </span>
        <div className="mt-4">
          <h2 className="font-semibold text-gray-700">Job Description</h2>
          <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{job.description}</p>
        </div>
        <div className="mt-4">
          <h2 className="font-semibold text-gray-700">Requirements</h2>
          <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{job.requirements}</p>
        </div>
        <p className="mt-4 text-sm text-gray-600">📅 <span className="font-medium">Posted:</span> {new Date(job.createdAt).toLocaleDateString()}</p>
        <a
          href={`https://wa.me/${job.contact.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 w-full block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg"
        >
          💬 Apply via WhatsApp
        </a>
      </div>
    </div>
  );
}
