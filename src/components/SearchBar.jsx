import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useJobs } from '../context/useJobs';
import { SearchHistoryList } from './SearchHistoryList';

const SearchBar = () => {
  const { fetchJobs, searchHistory } = useJobs();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false); // 👈 track focus state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchJobs(query.trim());
      setIsFocused(false); // hide history after submit
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/60" />
          <input
            type="text"
            value={query}
            onFocus={() => setIsFocused(true)} // 👈 show on focus
            onBlur={() => setTimeout(() => setIsFocused(false), 150)} // 👈 hide after blur
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for remote jobs... (e.g., React Developer)"
            className="input input-bordered w-full pl-6 pr-4 h-12 text-lg shadow-lg"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary absolute right-2 top-1 bottom-1"
        >
          Search
        </button>
      </form>

      {/* 👇 show only when focused */}
      {isFocused && searchHistory.length > 0 && (
        <div className="absolute w-full mt-1">
          <SearchHistoryList
            onSelect={(term) => {
              setQuery(term);
              fetchJobs(term);
              setIsFocused(false); // hide after select
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
