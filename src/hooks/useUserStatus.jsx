import React from 'react';
import { useQuery } from 'react-query';
import useAuth from './useAuth';
import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';

const useUserStatus = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: status, isLoading: isStatusLoading } = useQuery({
        queryKey: ['isStatus', user?.email],
        enabled: user !== null,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/status/${user?.email}`)
            return res.data;
        }
    })
    return [status, isStatusLoading];
};

export default useUserStatus;