import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from "framer-motion";

const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);
    const [axiosSecure] = useAxiosSecure();
    useEffect(() => {
        const getData = async () => {
            const res = await axiosSecure.get('/instructors')
            const { data } = res;
            setInstructors(data)
        }
        getData();
    }, [])


    return (
        <div>
            <div className='flex justify-center items-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>Popular Instructors</h3>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 px-5 my-10'>
                {
                    instructors?.length > 0 && instructors.map(item => <div key={item._id}>
                        <div className="card w-full shadow-xl">
                            <motion.div whileHover={{ scale: 1.1 }} className="p-10">
                                <div style={{ background: `url(${item.img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} className=" rounded-xl  h-72 w-full relative shadow">
                                    <h2 className='bg-neutral text-white absolute w-full bottom-14 text-center text-lg'>{item?.name}</h2>
                                    <h2 className='bg-neutral text-white absolute w-full bottom-5 text-center text-lg'>Students :  {item?.students ? item?.students : "0"}</h2>
                                </div>
                            </motion.div>

                        </div>
                    </div>)
                }
            </div>

        </div >
    );
};

export default PopularInstructor;