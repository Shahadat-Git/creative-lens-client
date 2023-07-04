import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import errorImg from '../../assets/error.json'
import Lottie from "lottie-react";

const ErrorPage = () => {
    const { status, statusText, error } = useRouteError();
    const navigate = useNavigate();
    return (
        <div className='w-full p-20 h-screen'>
            <Lottie style={{ height: '50vh', width: '100%' }} animationData={errorImg} loop={true} />


            <div className='flex flex-col items-center gap-5'>
                <h2 className='text-4xl  font-bold text-neutral'>{status && status}</h2>
                <h1 className='lg:text-6xl  font-bold text-neutral'>{statusText || "Error"}</h1>
                <h3 className=' text-center lg:text-4xl  font-bold text-neutral'>{error && error.message}</h3>
                <button onClick={() => navigate('/')} className='btn'>GO HOME</button>
            </div>

        </div>
    );
};

export default ErrorPage;