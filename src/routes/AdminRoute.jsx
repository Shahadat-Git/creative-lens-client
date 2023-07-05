import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserStatus from '../hooks/useUserStatus';
import { Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [status, isStatusLoading] = useUserStatus();

    if (loading || isStatusLoading) {
        return <Spinner></Spinner>
    }

    if (user && status.status === 'admin') {
        return children;
    }

    return <Navigate to='/login'></Navigate>
};

export default AdminRoute;