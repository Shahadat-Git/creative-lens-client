import React, { useState } from 'react';
import Lottie from "lottie-react";
import signUpAnimation from '../../assets/sign-up-animation.json'
import { Link } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useForm } from "react-hook-form"
import GoogleLogin from '../../shared/GoogleLogin/GoogleLogin';





const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }




    return (
        <div>
            <h2 className='text-5xl text-center my-5 font-semibold'>Please Register</h2>
            <div className='lg:flex items-center'>
                <div className='hidden lg:block lg:w-1/2'>
                    <Lottie animationData={signUpAnimation} loop={true} />
                </div>
                <div className='lg:w-1/2 shadow-2xl px-8 py-5 lg:px-16 lg:py-10 rounded'>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label className='block my-2 ml-2'>Name : </label>
                        <input  {...register("name", { required: true })} type="text" name='name' placeholder="Your Name" className="input input-bordered w-full " />
                        {errors.name && <span className='text-error my-1 block'>This field is required</span>}

                        <label className='block my-2 ml-2'>Email : </label>
                        <input  {...register("email", { required: true })} type="email" name='email' placeholder="Your Email" className="input input-bordered w-full " />
                        {errors.email && <span className='text-error my-1 block'>This field is required</span>}

                        <label className='block my-2 ml-2'>Password : </label>
                        <div className='relative'>
                            <input {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: {
                                    value: /(?=.*[A-Z].*[!@#$&*])/,
                                    message: 'Make sure one capital letter & one special character'
                                },
                            })} type={showPassword ? 'text' : 'password'} name='password' placeholder="Password" className="input input-bordered w-full " />
                            {
                                showPassword ? <HiEye onClick={() => setShowPassword(!showPassword)} className='cursor-pointer text-xl absolute right-2 top-[30%]'></HiEye> :
                                    <HiEyeOff onClick={() => setShowPassword(!showPassword)} className='cursor-pointer text-xl absolute right-2 top-[30%]'></HiEyeOff>
                            }
                        </div>
                        {errors.password?.type === 'required' && <span className='text-error my-1 block'>This field is required</span>}

                        {errors.password?.type === 'minLength' && <span className='text-error my-1 block'>Password must have at least 6 characters</span>}

                        {errors.password?.type === 'pattern' && <span className='text-error my-1 block'>{errors.password.message}</span>}



                        <label className='block my-2 ml-2'>Confirm Password : </label>
                        <div className='relative'>
                            <input {...register("confirm", {
                                required: true,
                                validate: (value) => value === watch("password") || "Password don't match"
                            })} type={showConfirmPassword ? 'text' : 'password'} name='confirm' placeholder="Confirm Password" className="input input-bordered w-full " />
                            {
                                showConfirmPassword ? <HiEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='cursor-pointer text-xl absolute right-2 top-[30%]'></HiEye> :
                                    <HiEyeOff onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='cursor-pointer text-xl absolute right-2 top-[30%]'></HiEyeOff>
                            }
                        </div>
                        {errors.confirm?.type === 'required' && <span className='text-error my-1 block'>This field is required</span>}

                        {errors.confirm?.type === 'validate' && <span className='text-error my-1 block'>{errors.confirm.message}</span>}



                        <label className='block my-2 ml-2'>Photo URL : </label>
                        <input  {...register("photo", { required: true })} type="text" name='photo' placeholder="Photo URL" className="input input-bordered w-full " />
                        {errors.photo && <span className='text-error my-1 block'>This field is required</span>}


                        <Link to='/login' className='mt-2 mb-5 block text-neutral-500'>Already have an account?</Link>
                        <button className='btn btn-block'>Register</button>
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


export default Register;