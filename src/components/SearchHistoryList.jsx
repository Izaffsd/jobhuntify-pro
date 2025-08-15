import { useJobs } from '../context/useJobs';

export const SearchHistoryList = ({ onSelect }) => {
  const { searchHistory } = useJobs();

  if (!searchHistory.length) return null;

  return (
    <ul className="menu bg-base-200 p-2 rounded-box shadow-lg">
      {searchHistory.map((query, idx) => (
        <li key={idx}>
          <button onClick={() => onSelect(query)}>{query}</button>
        </li>
      ))}
    </ul>
  );
};
