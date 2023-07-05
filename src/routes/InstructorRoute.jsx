import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useUserStatus from '../hooks/useUserStatus';
import Spinner from '../components/Spinner';

const InstructorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [status, isStatusLoading] = useUserStatus();


    if (loading || isStatusLoading) {
        return <Spinner></Spinner>
    }

    if (user && status.status === 'instructor') {
        return children;
    }

    return <Navigate to='/login'></Navigate>
};

export default InstructorRoute;