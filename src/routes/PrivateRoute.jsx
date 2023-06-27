import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { DotLoader } from 'react-spinners';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <div className='flex justify-center items-center h-screen'>
            <DotLoader/>
        </div>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;