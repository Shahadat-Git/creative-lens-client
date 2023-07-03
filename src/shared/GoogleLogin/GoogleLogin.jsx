import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const GoogleLogin = () => {
    const { user, googleSignIn } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                // console.log(result.user)
                const loggedUser = result.user;
                const user = {
                    name: loggedUser.displayName,
                    email: loggedUser.email,
                    role: 'student',
                    img: loggedUser?.photoURL,
                }
                axiosSecure.post('/users', user)
                    .then(data => {
                        // console.log(data)
                    })
                toast.success('Login Successfull !')
            })
            .catch((error) => {
                toast.error(error.message)
                // console.log(error.message)
            })
    }
    return (
        <button disabled={user} onClick={handleGoogleLogin} className='btn btn-block'><FcGoogle className='text-3xl'></FcGoogle> Login With Google</button>
    );
};

export default GoogleLogin;