import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useUserStatus from '../hooks/useUserStatus';
import { DotLoader } from 'react-spinners';

const InstructorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [status, isStatusLoading] = useUserStatus();
    if (loading || isStatusLoading) {
        return <div className='flex justify-center items-center h-screen'>
            <DotLoader />
        </div>
    }

    if (user && status.status === 'instructor') {
        return children;
    }

    return <Navigate to='/login'></Navigate>
};

export default InstructorRoute;