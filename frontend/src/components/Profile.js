import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user } = useAuth0();

  return (
    <section className="profile-section">
      <h2>User Profile</h2>
      
      <div className="user-info">
        {user?.picture && (
          <img 
            src={user.picture} 
            alt="Profile picture" 
            style={{ 
              width: '100px', 
              borderRadius: '50%', 
              display: 'block', 
              margin: '0 auto 20px' 
            }} 
          />
        )}
        
        <h3>{user?.name}</h3>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Email Verified:</strong> {user?.email_verified ? 'Yes' : 'No'}</p>
        <p><strong>User ID:</strong> {user?.sub}</p>
        <p><strong>Last Updated:</strong> {new Date(user?.updated_at).toLocaleString()}</p>
      </div>
      
      <div className="json-data" style={{ marginTop: '20px' }}>
        <h3>Full User Data</h3>
        <pre 
          style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '4px', 
            overflow: 'auto' 
          }}
        >
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </section>
  );
};

export default Profile; 