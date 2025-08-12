import { useEffect } from 'react';
import { BriefcaseBusiness, Loader } from 'lucide-react';
import   SearchBar  from '../components/SearchBar';
import JobCard from '../components/JobCard';

import { useJobs } from '../context/useJobs';

const HomePage = () => {
  const { jobs, loading, error, fetchJobs, fetched } = useJobs();
  
useEffect(() => {
  if (!fetched) {
    fetchJobs('develop');
  }
}, [fetched, fetchJobs]);

console.log('loading:', loading, 'error:', error, 'jobs:', jobs.length);
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BriefcaseBusiness className="h-12 w-12 text-primary" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            JobHuntify Pro
          </h1>
        </div>
        <p className="text-xl text-base-content/70 max-w-2xl mx-auto mb-8">
          Discover your next remote opportunity with advanced search and tracking tools.
        </p>
        <SearchBar />
      </div>

      {/* Results Section */}
      <div className="mt-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg text-base-content/70">Searching for amazing jobs...</p>
          </div>
        ) : error ? (
          <div className="alert alert-error">
            <p>Error: {error}</p>
            <button 
              onClick={() => fetchJobs('')}
              className="btn btn-sm btn-outline"
            >
              Try Again
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No jobs found</h3>
            <p className="text-base-content/70">
              Try searching for different keywords or add more keywordsto find opportunities.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {jobs.length} Job{jobs.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;