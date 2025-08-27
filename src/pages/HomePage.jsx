import { useEffect } from "react";
import { BriefcaseBusiness, Loader } from "lucide-react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";
import FilterPanel from "../components/FilterPanel";
import SunspotLoader from "../components/SunspotLoader"

import { useJobs } from "../context/useJobs";

const HomePage = () => {
  const { jobs, loading, error, fetchJobs, fetched, filters } = useJobs();

  const filteredJobs = jobs.filter((job) => {
    return (
      (!filters.category || job.category?.includes(filters.category)) &&
      (!filters.jobType || job.job_type?.toLowerCase() === filters.jobType) &&
      (!filters.location ||
        job.candidate_required_location
          ?.toLowerCase()
          .includes(filters.location.toLowerCase()))
    );
  });

  if (filters.sortBy === "oldest") {
    filteredJobs.sort(
      (a, b) => new Date(a.publication_date) - new Date(b.publication_date)
    );
  } else if (filters.sortBy === "company") {
    filteredJobs.sort((a, b) => a.company_name.localeCompare(b.company_name));
  } else if (filters.sortBy === "title") {
    filteredJobs.sort((a, b) => a.title.localeCompare(b.title));
  }

  useEffect(() => {
    if (!fetched) {
      fetchJobs("develop");
    }
  }, [fetched, fetchJobs]);

  console.log("loading:", loading, "error:", error, "jobs:", jobs.length);
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
          Discover your next remote opportunity with advanced search, smart
          filtering, and powerful application tracking tools.
        </p>
        <SearchBar />
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterPanel />
        </div>

        {/* Jobs Section */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <SunspotLoader
                gradientColors={["#6366F1", "#E0E7FF"]}
                shadowColor={"#3730A3"}
                desktopSize={"128px"}
                mobileSize={"100px"}
              />
              <p className="text-lg text-base-content/70">
                Searching for amazing jobs...
              </p>
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <p>Error: {error}</p>
              <button
                onClick={() => fetchJobs("")}
                className="btn btn-sm btn-outline"
              >
                Try Again
              </button>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No jobs found</h3>
              <p className="text-base-content/70">
                Try searching for different keywords or add more keywords to
                find opportunities.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">
                  {filteredJobs.length} Job
                  {filteredJobs.length !== 1 ? "s" : ""} Found
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
