import { createContext, useContext, useReducer } from 'react';
// Custom hook to handle localStorage (you need to implement this separately)
import { useLocalStorage } from '../hooks/useLocalStorage';

// 1. Create a context object for the jobs data and functions
const JobContext = createContext();

// 2. Custom hook for consuming the JobContext easily in components
export const useJobs = () => {
  // Access the context value
  const context = useContext(JobContext);
  
  // If used outside the JobProvider, throw an error to prevent bugs
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  
  // Return the context value (state + actions)
  return context;
};

// 3. Initial state of the jobs context, managed by useReducer
const initialState = {
  jobs: [],          // List of job objects fetched from API
  loading: false,    // Whether data is currently being fetched
  error: null,       // Holds error message if fetching fails
  selectedJob: null, // Job selected for details or editing (optional)
};

// 4. Reducer function to handle state changes based on action types
const jobReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      // Set loading state (true or false)
      return { ...state, loading: action.payload };
      
    case 'SET_JOBS':
      // Set jobs list, clear loading and error states
      return { ...state, jobs: action.payload, loading: false, error: null };
      
    case 'SET_ERROR':
      // Set error message and stop loading
      return { ...state, error: action.payload, loading: false };
      
    case 'SET_SELECTED_JOB':
      // Set the currently selected job for viewing/editing
      return { ...state, selectedJob: action.payload };
      
    default:
      // Return current state if action type is unknown
      return state;
  }
};

// 5. Provider component to wrap app or parts of app that need jobs data
export const JobProvider = ({ children }) => {
  // useReducer to manage complex state (jobs, loading, error, selectedJob)
  const [state, dispatch] = useReducer(jobReducer, initialState);

  // useLocalStorage hook to keep wishlist synced with browser localStorage
  // 'jobhuntify-wishlist' is the localStorage key; default is empty array
  const [wishlist, setWishlist] = useLocalStorage('jobhuntify-wishlist', []);

  // 6. Function to fetch jobs from the Remotive API with optional search query
  const fetchJobs = async (query = '') => {
    dispatch({ type: 'SET_LOADING', payload: true }); // Set loading before fetch
    
    try {
      // Fetch jobs from the API with encoded search query
      const response = await fetch(`https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}`);
      
      // Check if response is OK, else throw error
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      // Parse JSON data
      const data = await response.json();
      
      // Update jobs in state and clear loading/error
      dispatch({ type: 'SET_JOBS', payload: data.jobs || [] });
    } catch (error) {
      // If error happens, save error message and stop loading
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // 7. Add a job to wishlist stored in localStorage
  const addToWishlist = (job) => {
    // Prevent duplicates by checking if job already in wishlist by id
    if (wishlist.find(item => item.id === job.id)) {
      alert('Job already in wishlist!');
      return;
    }
    
    // Add new job to wishlist array and update localStorage
    const newWishlist = [...wishlist, job];
    setWishlist(newWishlist);
    
    alert('Job added to wishlist!');
  };

  // 8. Remove a job from wishlist by job ID
  const removeFromWishlist = (jobId) => {
    // Filter out the job with the given ID
    const newWishlist = wishlist.filter(job => job.id !== jobId);
    setWishlist(newWishlist);
    
    alert('Job removed from wishlist!');
  };

  // 9. Check if a job is already in wishlist by job ID (returns true/false)
  const isInWishlist = (jobId) => {
    return wishlist.some(job => job.id === jobId);
  };

  // 10. Provide all states and functions to components inside this provider
  return (
    <JobContext.Provider value={{
      ...state,               // jobs, loading, error, selectedJob
      wishlist,               // wishlist from localStorage
      fetchJobs,              // function to fetch jobs from API
      addToWishlist,          // add job to wishlist
      removeFromWishlist,     // remove job from wishlist
      isInWishlist,           // check if job is in wishlist
      dispatch                // expose dispatch for advanced usage if needed
    }}>
      {children}
    </JobContext.Provider>
  );
};
