import { useContext } from "react";
import { JobContext }from './JobContext'

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