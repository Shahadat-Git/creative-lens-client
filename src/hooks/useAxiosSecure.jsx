import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'https://creative-lens-school-server.vercel.app'
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Add a request interceptor
        axiosSecure.interceptors.request.use(function (config) {
            // Do something before request is sent
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor
        axiosSecure.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, async function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error

            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                // console.log('go login page')
                await logOut();
                navigate('/login')
            }
            return Promise.reject(error);
        });
    }, [user]);


    return [axiosSecure];
};

export default useAxiosSecure;