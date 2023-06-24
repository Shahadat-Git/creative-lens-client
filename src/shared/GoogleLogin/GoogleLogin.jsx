import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
    return (
        <button className='btn btn-block'><FcGoogle className='text-3xl'></FcGoogle> Login With Google</button>
    );
};

export default GoogleLogin;