import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <header>
      <h1>Auth0 React Demo</h1>
      <nav>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="btn">Profile</Link>
            <button 
              className="btn btn-logout" 
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          </>
        ) : (
          <button 
            className="btn btn-login" 
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header; 