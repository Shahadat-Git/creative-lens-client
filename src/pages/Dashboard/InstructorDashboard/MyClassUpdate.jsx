import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const MyClassUpdate = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { id } = useParams();



    const onSubmit = (data) => {
        // console.log(data)

        const { className,  price, seats } = data;


        const updatedClass = {
            name: className,
            seats,
            price,
        }

        axiosSecure.patch(`/classes/${id}`, updatedClass)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully Updated',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }




    return (
        <div>
            <h2 className='text-5xl text-center my-5 font-semibold'>Update Class</h2>
            <div className='lg:flex justify-center'>
                <div className='lg:w-8/12 shadow-2xl px-8 py-5 lg:px-16 lg:py-10 rounded'>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label className='block my-2 ml-2'>Class Name : </label>
                        <input   {...register("className")} type="text" name='className' placeholder="Class Name" className="input input-bordered w-full " />


                        <label className='block my-2 ml-2'>Instructor Name : </label>
                        <input  {...register("instructorName")} type="text" name='instructorName' readOnly defaultValue={user?.displayName} placeholder="Instructor Name" className="input input-bordered w-full " />

                        <label className='block my-2 ml-2'>Instructor Email : </label>
                        <input  {...register("instructorEmail")} type="text" name='instructorEmail' readOnly defaultValue={user?.email} placeholder="Instructor Email" className="input input-bordered w-full " />


                        <label className='block my-2 ml-2'>Available Seats : </label>
                        <input  {...register("seats")} type="number" name='seats' placeholder="Available Seats" className="input input-bordered w-full " />


                        <label className='block my-2 ml-2'>Price : </label>
                        <input {...register("price")} type="number" name='price' placeholder="Price" className="input input-bordered w-full " />


                        <button className='btn btn-block mt-2'>Update</button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default MyClassUpdate;