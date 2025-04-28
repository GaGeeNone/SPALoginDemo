import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Callback = () => {
  const navigate = useNavigate();
  const { isAuthenticated, error } = useAuth0();

  useEffect(() => {
    // If authentication is successful, navigate to the home page
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (error) {
    return (
      <div className="container">
        <h2>Authentication Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="loader">
        <p>Processing authentication, please wait...</p>
      </div>
    </div>
  );
};

export default Callback; 