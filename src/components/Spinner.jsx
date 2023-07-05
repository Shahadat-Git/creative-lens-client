import React from 'react';
import { DotLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <DotLoader />
        </div>
    );
};

export default Spinner;