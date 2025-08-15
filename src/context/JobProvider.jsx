import { useReducer, useCallback, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { JobContext } from './JobContext';
// import { Toast } from '../components/ToastContainer';

const initialState = {
  jobs: [],
  loading: false,
  error: null,
  selectedJob: null,
  fetched: false,
  searchQuery: '',
  filters: {
    category: '',
    jobType: '',
    location: '',
    sortBy: 'newest'
  },
  searchHistory: [],
  toasts: []
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
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, { ...action.payload, id: Date.now() }] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter(toast => toast.id !== action.payload) };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload }}
    default:
      return state;
  }
};
    
export const JobProvider = ({ children }) => {
      const [state, dispatch] = useReducer(jobReducer, initialState);
      const [wishlist, setWishlist] = useLocalStorage('jobhuntify-wishlist', []);
      const [searchHistory, setSearchHistory] = useLocalStorage('jobhuntify-search-history', []);
      
  const debounceTimeoutRef = useRef(null);
  const cacheRef = useRef({});
  const abortControllerRef = useRef(null);

  const showToast = (message, type = 'info') => {
    dispatch({
      type: 'ADD_TOAST',
      payload: { message, type }
    });
  };

  const removeToast = (id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  };


  const fetchJobs = useCallback((query = '') => {
     const trimmedQuery = query.trim();

  // ✅ Only fetch & save if query has 2+ characters
      if (trimmedQuery.length < 2) return;

    setSearchHistory((prev) => {
      const updated = [trimmedQuery, ...prev.filter((item) => item !== trimmedQuery)];
      return updated.slice(0, 10); // Keep only last 10 searches
    });

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

        // 🔍 Custom filter — match title, company_name, skills, and tags
        const q = query.toLowerCase();
        const filtered = jobs.filter((job) => {
          const titleMatch = job.title?.toLowerCase().includes(q);
          const companyMatch = job.company_name?.toLowerCase().includes(q);

          // Tags array check
          const tagsMatch = job.tags?.some(tag => tag.toLowerCase().includes(q));

          // Skills array check (if exists)
          const skillsMatch = job.skills?.some(skill => skill.toLowerCase().includes(q));

          return titleMatch || companyMatch || tagsMatch || skillsMatch;
        });

        cacheRef.current[query] = filtered;
        dispatch({ type: 'SET_JOBS', payload: filtered });

      } catch (error) {
        if (error.name !== 'AbortError') {
          dispatch({ type: 'SET_ERROR', payload: error.message });
        }
      }
    }, 500);
  }, [setSearchHistory]);

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
        searchHistory,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        showToast,
        removeToast,
        dispatch,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
