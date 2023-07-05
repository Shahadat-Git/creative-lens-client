import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import useAuth from '../../../hooks/useAuth';
import noImg from '../../../assets/no-img.jpg';
import moment from 'moment/moment';
import { Helmet } from 'react-helmet-async';

const MyEnrolledClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const { data: classes = [], isLoading: isClassesLoading, } = useQuery({
        queryKey: ['classes', user?.email],
        enabled: user !== null,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <Helmet>
                <title>Dashboard | Enrolled Classes</title>
            </Helmet>
            <div className='flex justify-center items-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>Enrolled Classes</h3>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 px-5 my-10'>
                {
                    classes.length > 0 && classes.map(item => <div key={item._id}>
                        <div className="card w-full bg-base-100 shadow-xl">
                            <div className="px-10 pt-10">
                                <img src={item.classImg || noImg} className=" rounded-xl border-2 h-72 w-full object-cover" />
                            </div>
                            <div className="card-body ">
                                <p className="text-md font-semibold">Name : {item.className}</p>
                                <p className="text-md font-semibold">Price : ${item.price}</p>
                                <p className="text-md font-semibold">Enrolled Date:  {moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}</p>

                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyEnrolledClasses;