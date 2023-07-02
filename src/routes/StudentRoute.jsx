import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserStatus from '../hooks/useUserStatus';
import { DotLoader } from 'react-spinners';
import { Navigate } from 'react-router-dom';

const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [status, isStatusLoading] = useUserStatus();
    if (loading || isStatusLoading) {
        return <div className='flex justify-center items-center h-screen'>
            <DotLoader />
        </div>
    }

    if (user && status.status === 'student') {
        return children;
    }

    return <Navigate to='/login'></Navigate>
};

export default StudentRoute;