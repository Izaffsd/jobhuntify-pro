import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useJobs } from '../context/useJobs';

const FilterPanel = () => {
  const { filters, dispatch, fetchJobs  } = useJobs();
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    'Data Analysis',
    'Design',
    'Marketing',
    'Human Resources',
    'Customer Support',
    'Sales',
    'Writing',
    'Finance',
    'DevOps'
  ];

  const jobTypes = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'company', label: 'Company A-Z' },
    { value: 'title', label: 'Job Title A-Z' }
  ];

  const updateFilter = (key, value) => {
    dispatch({ type: 'SET_FILTERS', payload: { [key]: value } });

    // If category changes, fetch jobs immediately
    if (key === 'category') {
      fetchJobs(value || 'develop'); // fallback to default
    }
  }

  const clearFilters = () => {
    dispatch({ 
      type: 'SET_FILTERS', 
      payload: { 
        category: '', 
        jobType: '', 
        location: '', 
        sortBy: 'newest' 
      } 
    });
  };

    const activeFilterCount = Object.values(filters || {}).filter(
        value => value && value !== 'newest'
    ).length;


  return (
    <div className="bg-base-100 shadow-lg rounded-lg">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer lg:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <span className="font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <span className="badge badge-primary badge-sm">{activeFilterCount}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearFilters();
              }}
              className="btn btn-ghost btn-xs"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
          <div className="lg:hidden">
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} lg:block border-t border-base-300`}>
        <div className="p-4 space-y-6">
          {/* Category Filter */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Developer</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type Filter */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Job Type</span>
            </label>
            <select
              value={filters.jobType}
              onChange={(e) => updateFilter('jobType', e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">All Types</option>
              {jobTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Location</span>
            </label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              placeholder="e.g., USA, Europe, Worldwide"
              className="input input-bordered w-full"
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Sort By</span>
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="select select-bordered w-full"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;