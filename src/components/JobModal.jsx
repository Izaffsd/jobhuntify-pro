import { X, Heart, ExternalLink, MapPin, Building, Calendar, DollarSign, Tag, StickyNote } from 'lucide-react';
import { useJobs } from '../context/useJobs';
import { JobProvider } from '../context/JobProvider';

const JobModal = () => {
    const { 
    selectedJob, 
    dispatch, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist
  } = useJobs();

  const handleClose = () => {
    dispatch({ type: 'SET_SELECTED_JOB', payload: null });
console.log('ldjls')

  };

  const handleWishlistToggle = () => {
    if (isInWishlist(selectedJob.id)) {
      removeFromWishlist(selectedJob.id);
    } else {
      addToWishlist(selectedJob);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!selectedJob) return null;

  return (
        <div className="modal modal-open">
      <div className="modal-box max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-base-100 z-10 p-6 border-b border-base-300">
          <div className="flex items-start justify-between">
            <div className="flex-1 mr-4">
              <h2 className="text-2xl font-bold text-base-content mb-2">
                {selectedJob.title}
              </h2>
              <div className="flex items-center gap-4 text-base-content/70">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span className="font-medium">{selectedJob.company_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedJob.candidate_required_location || 'Worldwide'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="btn btn-circle btn-ghost"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Job Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">Published:</span>
                <span>{formatDate(selectedJob.publication_date)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">Category:</span>
                <span className="badge badge-primary">{selectedJob.category}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">Type:</span>
                <span className="badge badge-secondary">
                  {selectedJob.job_type?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Full Time'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {selectedJob.tags && selectedJob.tags.length > 0 && (
                <div>
                  <span className="font-medium mb-2 block">Skills & Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tags.map((tag, index) => (
                      <span key={index} className="badge badge-outline">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Job Description</h3>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedJob.description }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-base-100 p-6 border-t border-base-300">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleWishlistToggle}
              className={`btn ${isInWishlist(selectedJob.id) ? 'btn-primary' : 'btn-outline btn-primary'}`}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(selectedJob.id) ? 'fill-current' : ''}`} />
              {isInWishlist(selectedJob.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
            
            <a
              href={selectedJob.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <ExternalLink className="h-4 w-4" />
              Apply Now
            </a>
          </div>
        </div>
      </div>
      
      <div className="modal-backdrop bg-black/50 backdrop-blur-sm" onClick={handleClose} />
    </div>
  )
}

export default JobModal