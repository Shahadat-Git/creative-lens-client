import React from 'react';
import adviceAnimation from '../../assets/advice-animation.json'
import Lottie from "lottie-react";

const Advice = () => {
    return (
        <div>
            <div className='flex justify-center items-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>Advice</h3>
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-center bg-base-200 lg:rounded-md mt-5 py-10'>
                <div className='lg:w-6/12'>
                    <Lottie animationData={adviceAnimation} loop={true} />
                </div>
                <div className='lg:w-6/12 text-center lg:px-10'>
                    <h3 className='text-2xl font-semibold my-2'>"Wait for the Perfect Moment"</h3>
                    <p>Photography is all about capturing moments, and sometimes the most impactful and visually stunning shots come to those who wait patiently. Instead of rushing through a scene or settling for mediocre shots, take your time to observe and anticipate the perfect moment. Be patient, be attentive, and be ready to press the shutter when everything aligns harmoniously — the right lighting, the ideal composition, and the decisive moment. Patience in photography can often lead to extraordinary and unforgettable images that truly stand out.</p>
                </div>
            </div>
        </div>
    );
};

export default Advice;