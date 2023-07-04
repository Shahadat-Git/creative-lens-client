import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import useAuth from '../../../hooks/useAuth';
import noImg from '../../../assets/no-img.jpg';

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
            <div className='flex justify-center items-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>Enrolled Classes</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map(item => <tr key={item._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.classImg || noImg} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.className}
                                </td>
                                <td>${item.price}</td>
                                <td>${item.transactionId}</td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyEnrolledClasses;