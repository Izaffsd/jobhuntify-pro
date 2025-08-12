import React from 'react'
import { useState } from 'react'

import { Search } from 'lucide-react'

import { useJobs } from '../context/useJobs'

const SearchBar = () => {

    const { fetchJobs } = useJobs()
    const [ query, setQuery ] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
        fetchJobs(query.trim());
        }
    };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-base-content/60" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              console.log("User typing:", e.target.value);
              setQuery(e.target.value);
            }}

            placeholder="Search for remote jobs... (e.g., React Developer)"
            className=" input input-bordered w-full pl-6 pr-4 h-12 text-lg shadow-lg responsive-placeholder"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary absolute right-2 top-1 bottom-1"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar