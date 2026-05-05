import React from 'react';
import { useAuth } from './AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  // 1. Get auth state and functions from the context
  // this page is inside ProtectedLayout, 'user' is never null.
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 2. Define the logout event handler
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate('/login'); // Redirect to login page after logout completes
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>

      <h2>Profile Page</h2>

      {/* 3. Display User Information */}


      <h3 style={{ marginTop: '1rem' }}>Welcome, {user.displayname}!</h3>

      <div style={{ lineHeight: '1.6' }}>
        <p><strong>Email:</strong> {user.email}</p>

        {/* The 'googleId' is what we stored in our backend */}
        {user.googleId && (
          <p><strong>User ID:</strong> {user.googleId}</p>
        )}
      </div>

      <hr style={{ margin: '1.5rem 0' }} />

      {/* 4. Logout Button */}
      <button
        onClick={handleLogout}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#d9534f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>

      {/* Optional: Show all data for debugging */}
      <details style={{ marginTop: '2rem', opacity: '0.7' }}>
        <summary>Raw User Data (for debugging)</summary>
        <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </details>

    </div>
  );
}

export default ProfilePage;