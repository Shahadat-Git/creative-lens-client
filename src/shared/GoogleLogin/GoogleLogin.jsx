import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

const GoogleLogin = () => {
    const { googleSignIn } = useAuth();

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                // console.log(result.user)
                toast.success('Login Successfull !')
            })
            .catch((error) => {
                toast.error(error.message)
                // console.log(error.message)
            })
    }
    return (
        <button onClick={handleGoogleLogin} className='btn btn-block'><FcGoogle className='text-3xl'></FcGoogle> Login With Google</button>
    );
};

export default GoogleLogin;