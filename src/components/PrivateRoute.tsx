import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const DEV_MODE = true; // Toggle this for development

export const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  return (DEV_MODE || isAuthenticated) ? <Outlet /> : <Navigate to="/code-entry" />;
}; 