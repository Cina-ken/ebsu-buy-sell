import prisma from '@/lib/prisma';
import { JobCard } from '@/components/JobCard';
import SearchFilters from '@/components/SearchFilters';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Jobs — EBSU Buy & Sell',
  description: 'Find job vacancies in the EBSU community. Full-time, part-time, remote, freelance and more.',
};

interface Props {
  searchParams: Promise<{ search?: string; subcategory?: string }>;
}

export default async function JobsPage({ searchParams }: Props) {
  const { search, subcategory } = await searchParams;

  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        search ? { OR: [{ title: { contains: search, mode: 'insensitive' } }, { description: { contains: search, mode: 'insensitive' } }, { company: { contains: search, mode: 'insensitive' } }] } : {},
        subcategory ? { subcategory } : {},
      ],
    },
    orderBy: { createdAt: 'desc' },
  });

  const jobTypes = ['Full-Time', 'Part-Time', 'Remote Jobs', 'Internships & Volunteering', 'Freelance & Gigs', 'Skilled Labour', 'Teaching & Academics', 'Admin & Office Jobs'];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Jobs</h1>
      <SearchFilters categories={jobTypes} basePath="/jobs" />
      <p className="text-sm text-gray-500 mb-4">{jobs.length} job{jobs.length !== 1 ? 's' : ''} found</p>
      {jobs.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-4xl mb-4">💼</p>
          <p className="text-lg font-medium">No jobs found</p>
          <p className="text-sm mt-1">Try adjusting your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => <JobCard key={job.id} {...job} />)}
        </div>
      )}
    </div>
  );
}