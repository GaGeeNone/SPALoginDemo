import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Components
import Home from './components/Home';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Callback from './components/Callback';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="container">
        <div className="loader">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback" element={<Callback />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 