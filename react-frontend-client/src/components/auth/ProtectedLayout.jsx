import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth(); // <-- Get state
  const location = useLocation();

  // 1. Handle the loading state
  // While we're checking the session, show a loader
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 2. Handle the 'not authenticated' state
  // After loading, if still not authenticated, redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Handle the 'authenticated' state
  // We're loaded and authenticated, render the child route
  return <Outlet />;
}

export default ProtectedLayout;