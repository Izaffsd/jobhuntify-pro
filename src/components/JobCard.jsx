import { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Heart, ExternalLink, DollarSign } from 'lucide-react';
import { useJobs } from '../context/useJobs';

const JobCard = ({ job }) => {
  const { dispatch, addToWishlist, removeFromWishlist, isInWishlist } = useJobs();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleViewDetails = () => {
    dispatch({ type: 'SET_SELECTED_JOB', payload: job });
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist(job.id)) {
      removeFromWishlist(job.id);
    } else {
      addToWishlist(job);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div ref={cardRef} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="card-body p-6">
        <div className="flex items-center gap-3 mb-4">
          {isInView ? (
            <>
              {!isImageError && job.company_logo ? (
                <img
                  src={job.company_logo}
                  alt={`${job.company_name} logo`}
                  loading="lazy"
                  className={`h-12 w-12 rounded object-contain transition-opacity duration-300 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setIsImageLoaded(true)}
                  onError={() => {
                    setIsImageError(true);
                    setIsImageLoaded(true);
                  }}
                />
              ) : (
                <img
                  src="/default-logo.png"
                  alt="Default company logo"
                  className="h-12 w-12 rounded object-contain"
                />
              )}
              
              {!isImageLoaded && !isImageError && job.company_logo && (
                <div className="h-12 w-12 rounded bg-base-200 animate-pulse" />
              )}
            </>
          ) : (
            <div className="h-12 w-12 rounded bg-base-200 animate-pulse" />
          )}

          <div className="flex items-center gap-2 text-base-content/70">
            <span className="font-medium">{job.company_name}</span>
          </div>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="card-title text-lg font-bold mb-2 line-clamp-2">
              {job.title}
            </h3>
          </div>
          <button
            onClick={handleWishlistToggle}
            className={`btn btn-circle btn-sm ${
              isInWishlist(job.id) 
                ? 'btn-primary text-primary-content' 
                : 'btn-ghost text-base-content/60'
            }`}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(job.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <MapPin className="h-4 w-4" />
            <span>{job.candidate_required_location || 'Worldwide'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(job.publication_date)}</span>
          </div>
          {job.salary && (
            <div className="flex items-center gap-2 text-sm text-base-content/60">
              <DollarSign className="h-4 w-4" />
              <span>{job.salary}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="badge badge-primary">{job.category}</div>
          <div className="badge badge-secondary">
            {job.job_type?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Full Time'}
          </div>
        </div>

        <div className="card-actions justify-between items-center">
          <button
            onClick={handleViewDetails}
            className="btn btn-primary btn-sm flex-1 mr-2"
          >
            View Details
          </button>
          <a 
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            aria-label={`View job details for ${job.title}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;