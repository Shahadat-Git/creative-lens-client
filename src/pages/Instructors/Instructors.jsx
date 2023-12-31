import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import noImg from '../../assets/no-img.jpg';
import { FaUserAlt } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { Helmet } from 'react-helmet-async';


const Instructors = () => {
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
            <Helmet>
                <title>Creative Lens | Instructors</title>
            </Helmet>
            <div className='flex justify-center items-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>Instructors</h3>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 px-5 my-5'>
                {
                    instructors.length > 0 && instructors.map(item => <div key={item._id}>
                        <div className="w-full bg-base-100 shadow-xl lg:flex rounded items-center justify-center">
                            <div className="p-5 lg:w-4/12  shadow-lg ">
                                <img className='w-full rounded-xl h-[200px] lg:h-32' src={item.img || noImg} />
                            </div>
                            <div className="card-body lg:w-8/12 ">
                                <p className="text-md font-semibold flex items-center gap-2 flex-wrap"><FaUserAlt></FaUserAlt> {item.name}</p>

                                <p className='text-md font-semibold flex items-center gap-2 flex-wrap'> <HiMail></HiMail>{item.email}</p>

                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Instructors;