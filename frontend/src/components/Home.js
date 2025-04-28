import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from the API when the user is authenticated
  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          setLoading(true);
          // Get the access token
          const accessToken = await getAccessTokenSilently();
          
          // Call the API with the access token
          const response = await fetch('http://localhost:3000/api/data', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          
          if (!response.ok) {
            throw new Error('API request failed');
          }
          
          const data = await response.json();
          setApiData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <section className="welcome">
      <h2>Welcome to Auth0 React Demo</h2>
      <p>This is a simple demonstration of Auth0 authentication with React</p>
      
      {isAuthenticated ? (
        <div className="user-info">
          <p>You are logged in as: <strong>{user.name}</strong></p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Please log in to see your profile information</p>
      )}

      {isAuthenticated && (
        <div className="data-section">
          <h3>API Data</h3>
          {loading && <p>Loading data...</p>}
          {error && <p>Error: {error}</p>}
          {apiData && (
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          )}
        </div>
      )}
    </section>
  );
};

export default Home; 