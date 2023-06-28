import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddClass = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const onSubmit = (data) => {
        // console.log(data)

        const { className, classImage, instructorName, instructorEmail, price, seats } = data;

        const imgForm = new FormData()
        imgForm.append('image', classImage[0])

        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, imgForm)
            .then(res => {
                // console.log(res.data)
                if (res.data.status) {
                    const imgURL = res.data?.data?.display_url;
                    // console.log(imgURL)

                    const classData = {
                        name: className,
                        img: imgURL,
                        instructorName,
                        instructorEmail,
                        seats,
                        price,
                        status: 'pending'
                    }

                    axiosSecure.post('/classes', classData)
                        .then(res => {
                            // console.log(res.data)
                            if (res.data.insertedId) {
                                Swal.fire(
                                    'Good job!',
                                    'Class Successfully added',
                                    'success'
                                )
                            }
                        })

                }
            })

    }




    return (
        <div>
            <h2 className='text-5xl text-center my-5 font-semibold'>Add New Class</h2>
            <div className='lg:flex justify-center'>
                <div className='lg:w-8/12 shadow-2xl px-8 py-5 lg:px-16 lg:py-10 rounded'>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label className='block my-2 ml-2'>Class Name : </label>
                        <input  {...register("className", { required: true })} type="text" name='className' placeholder="Class Name" className="input input-bordered w-full " />
                        {errors.className && <span className='text-error my-1 block'>This field is required</span>}

                        <label className='block my-2 ml-2'>Class Image : </label>
                        <input {...register("classImage", { required: true })} type="file" name='classImage' className="file-input file-input-bordered file-input- file-input-md w-full" />
                        {errors.classImage && <span className='text-error my-1 block'>This field is required</span>}


                        <label className='block my-2 ml-2'>Instructor Name : </label>
                        <input  {...register("instructorName", { required: true })} type="text" name='instructorName' readOnly defaultValue={user?.displayName} placeholder="Instructor Name" className="input input-bordered w-full " />
                        {errors.instructorName && <span className='text-error my-1 block'>This field is required</span>}

                        <label className='block my-2 ml-2'>Instructor Email : </label>
                        <input  {...register("instructorEmail", { required: true })} type="text" name='instructorEmail' readOnly defaultValue={user?.email} placeholder="Instructor Email" className="input input-bordered w-full " />
                        {errors.instructorEmail && <span className='text-error my-1 block'>This field is required</span>}

                        <label className='block my-2 ml-2'>Available Seats : </label>
                        <input  {...register("seats", { required: true })} type="number" name='seats' placeholder="Available Seats" className="input input-bordered w-full " />
                        {errors.seats && <span className='text-error my-1 block'>This field is required</span>}

                        <label className='block my-2 ml-2'>Price : </label>
                        <input  {...register("price", { required: true })} type="number" name='price' placeholder="Price" className="input input-bordered w-full " />
                        {errors.price && <span className='text-error my-1 block'>This field is required</span>}

                        <button className='btn btn-block mt-2'>Add</button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default AddClass;