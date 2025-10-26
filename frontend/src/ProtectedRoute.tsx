import { Navigate, Outlet } from 'react-router';
import { useContext } from 'react';
import AppContext from './context/AppContext';

const ProtectedRoute = () => {
    const { userData } = useContext(AppContext);

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
