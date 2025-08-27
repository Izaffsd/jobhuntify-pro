import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import TestCom from "./components/TestCom";

import HomePage from "./pages/HomePage";
import WishListPage from "./pages/WishListPage";
import TrackerPage from "./pages/TrackerPage";
import NotFound from "./pages/NotFound";
import JobModal from './components/JobModal.jsx';


function App() {
  const [name] = useState('iskandar')
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
              {/* <Route path="/tracker" element={<TrackerPage />} /> */}
              <Route path="*" element={
                <>
                  <NotFound propName={name} />
                  {/* <TestCom propName={name} /> */}
                </>
                } />
            </Routes>
          </main>
            <JobModal />
        </div>
      </Router>
    </>
  );
}

export default App;
