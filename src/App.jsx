import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import WishListPage from "./pages/WishListPage";
import TrackerPage from "./pages/TrackerPage";

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen">
          {/* (100vh) */}
          <Navbar />
          <main className="pt-16">
            <Routes>
              {/* default / index */}
              <Route path="/" element={<HomePage />} />
              <Route path="/wishlist" element={<WishListPage />} />
              <Route path="/tracker" element={<TrackerPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
