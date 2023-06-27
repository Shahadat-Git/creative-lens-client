import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const { user } = useAuth();

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
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error

            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                // TODO
                console.log('go login page')
            }
            return Promise.reject(error);
        });
    }, [user]);


    return [axiosSecure];
};

export default useAxiosSecure;