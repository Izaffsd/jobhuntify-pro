import { useReducer, useCallback, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { JobContext } from './JobContext';

const initialState = {
  jobs: [],
  loading: false,
  error: null,
  selectedJob: null,
  fetched: false,
};

const jobReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_JOBS':
      return { ...state, jobs: action.payload, loading: false, error: null, fetched: true };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SELECTED_JOB':
      return { ...state, selectedJob: action.payload };
    default:
      return state;
  }
};

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);
  const [wishlist, setWishlist] = useLocalStorage('jobhuntify-wishlist', []);

  const debounceTimeoutRef = useRef(null);
  const cacheRef = useRef({});
  const abortControllerRef = useRef(null);

  const fetchJobs = useCallback((query = '') => {
    // ✅ Do not search if less than 3 characters
    if (query.trim().length < 3) {
      dispatch({ type: 'SET_JOBS', payload: [] });
      return;
    }

    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

    // Show cached instantly
    if (cacheRef.current[query]) {
      dispatch({ type: 'SET_JOBS', payload: cacheRef.current[query] });
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const response = await fetch(
          `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}`,
          { signal: abortControllerRef.current.signal }
        );

        if (!response.ok) throw new Error('Failed to fetch jobs');

        const data = await response.json();
        const jobs = data.jobs || [];

        // Custom filter — title, company_name, category only
        const q = query.toLowerCase();
        const filtered = jobs.filter(
          (job) =>
            job.title?.toLowerCase().includes(q) ||
            job.company_name?.toLowerCase().includes(q) ||
            job.category?.toLowerCase().includes(q)
        );

        cacheRef.current[query] = filtered;
        dispatch({ type: 'SET_JOBS', payload: filtered });

      } catch (error) {
        if (error.name !== 'AbortError') {
          dispatch({ type: 'SET_ERROR', payload: error.message });
        }
      }
    }, 500);
  }, []);

  const addToWishlist = (job) => {
    if (wishlist.find((item) => item.id === job.id)) {
      alert('Job already in wishlist!');
      return;
    }
    setWishlist([...wishlist, job]);
    alert('Job added to wishlist!');
  };

  const removeFromWishlist = (jobId) => {
    setWishlist(wishlist.filter((job) => job.id !== jobId));
    alert('Job removed from wishlist!');
  };

  const isInWishlist = (jobId) => wishlist.some((job) => job.id === jobId);

  return (
    <JobContext.Provider
      value={{
        ...state,
        wishlist,
        fetchJobs,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        dispatch,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
