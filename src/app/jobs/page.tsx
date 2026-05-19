import prisma from '@/lib/prisma';
import { JobCard } from '@/components/JobCard';

export const dynamic = 'force-dynamic';

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Jobs</h1>
      {jobs.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-4xl mb-4">💼</p>
          <p className="text-lg font-medium">No jobs posted yet</p>
          <p className="text-sm mt-1">Be the first to post a job!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => <JobCard key={job.id} {...job} />)}
        </div>
      )}
    </div>
  );
}
