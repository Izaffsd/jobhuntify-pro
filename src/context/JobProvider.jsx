import { useReducer, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { JobContext } from './JobContext';

const initialState = {
  jobs: [],
  loading: false,
  error: null,
  selectedJob: null,
};

const jobReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_JOBS':
      return { ...state, jobs: action.payload, loading: false, error: null };
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

  // ✅ useCallback makes fetchJobs stable across renders
  const fetchJobs = useCallback(async (query = '') => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await fetch(
        `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}`
      );

      if (!response.ok) throw new Error('Failed to fetch jobs');

      const data = await response.json();
      dispatch({ type: 'SET_JOBS', payload: data.jobs || [] });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
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
