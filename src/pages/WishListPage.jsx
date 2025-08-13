import { Heart, Trash2 } from 'lucide-react';
import JobCard from '../components/JobCard';
import { useJobs } from '../context/useJobs';
import { Link } from 'react-router-dom';

const WishListPage = () => {
    const { wishlist, removeFromWishlist } = useJobs();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      wishlist.forEach(job => removeFromWishlist(job.id));
    }
  };

  return (
     <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-primary fill-current" />
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <div className="badge badge-primary badge-lg">{wishlist.length}</div>
        </div>
        
        {wishlist.length > 0 && (
          <button
            onClick={handleClearAll}
            className="btn btn-outline btn-error"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">💝</div>
          <h3 className="text-2xl font-bold mb-2">Your wishlist is empty</h3>
          <p className="text-base-content/70 mb-6">
            Start exploring jobs and save the ones you're interested in!
          </p>
          <Link to="/" className="btn btn-primary">
            Explore Jobs
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {wishlist.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}

export default WishListPage