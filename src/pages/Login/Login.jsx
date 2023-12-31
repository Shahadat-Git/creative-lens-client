import React, { useState } from 'react';
import Lottie from "lottie-react";
import loginAnimation from '../../assets/login-animation.json'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useForm } from "react-hook-form"
import GoogleLogin from '../../shared/GoogleLogin/GoogleLogin';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';





const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuth();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        // console.log(data)
        const { email, password } = data;

        signIn(email, password)
            .then((result) => {
                // console.log(result.user)
                toast.success('Login Successfull !');
                navigate(from, { replace: true });
            })
            .catch((error) => {
                toast.error(error.message)
                // console.log(error.message)
            })
    }




    return (
        <div>
            <Helmet>
                <title>Creative Lens | Login</title>
            </Helmet>
            <h2 className='text-5xl text-center my-5 font-semibold'>Please Login</h2>
            <div className='lg:flex items-center'>
                <div className='hidden lg:block lg:w-1/2'>
                    <Lottie animationData={loginAnimation} loop={true} />
                </div>
                <div className='lg:w-1/2 shadow-2xl px-8 py-5 lg:px-16 lg:py-10 rounded'>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label className='block my-2 ml-2'>Email : </label>
                        <input  {...register("email", { required: true })} type="email" name='email' placeholder="Your Email" className="input input-bordered w-full " />
                        {errors.email && <span className='text-error my-1 block'>This field is required</span>}

                        <label className='block my-2 ml-2'>Password : </label>
                        <div className='relative'>
                            <input {...register("password", { required: true })} type={showPassword ? 'text' : 'password'} name='password' placeholder="Your Password" className="input input-bordered w-full " />
                            {
                                showPassword ? <HiEye onClick={() => setShowPassword(!showPassword)} className='cursor-pointer text-xl absolute right-2 top-[30%]'></HiEye> :
                                    <HiEyeOff onClick={() => setShowPassword(!showPassword)} className='cursor-pointer text-xl absolute right-2 top-[30%]'></HiEyeOff>
                            }
                        </div>
                        {errors.password && <span className='text-error my-1 block'>This field is required</span>}
                        <Link to='/register' className='mt-2 mb-5 block text-neutral-500'>Don't have an account?</Link>
                        <button disabled={user} className='btn btn-block'>Login</button>
                    </form>
                    <div className='flex items-center my-5'>
                        <hr className=' border-t-2 w-full' />
                        <p className='px-3'>Or</p>
                        <hr className=' border-t-2 w-full' />
                    </div>
                    <GoogleLogin></GoogleLogin>
                </div>
            </div>
        </div >
    );
};

export default Login;