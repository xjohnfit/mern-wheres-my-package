import { Navigate, Outlet } from 'react-router';
import { useContext } from 'react';
import AppContext from './context/AppContext';

const ProtectedRoute = () => {
    const { userData, authChecking } = useContext(AppContext);

    if (authChecking) {
        // While verifying token on initial load, avoid redirect flicker
        return null; // or a loader/spinner
    }

    if (!userData) {
        // User not authenticated, redirect to login page
        return (
            <Navigate
                to='/login'
                replace
            />
        );
    }

    // User authenticated, render the nested routes
    return <Outlet />;
};

export default ProtectedRoute;
