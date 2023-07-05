import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from 'react-query';
import noImg from '../../../assets/no-img.jpg';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const MySelectedClasses = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: carts = [], isLoading: isCartsLoading, refetch } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: user !== null,
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${user?.email}`)
            return res.data;
        }
    })
    // console.log(carts)

    const handleDelete = (id) => {
        axiosSecure.delete(`/carts/${id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.deletedCount > 0) {
                    toast.success('Item deleted');
                    refetch();
                }
            })
    }
    return (
        <div>
            <Helmet>
                <title>Dashboard | Selected Classes</title>
            </Helmet>
            <div className='flex justify-center items-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>Selected classes</h3>
            </div>
            <div className="overflow-x-auto mt-5">
                {
                    carts.length > 0 ? <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                carts.map(item => <tr key={item._id}>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.img || noImg} alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>${item.price}</td>
                                    <th>
                                        <div className='flex gap-2'>
                                            <button onClick={() => handleDelete(item._id)} className="btn  btn-xs btn-error">Delete</button>
                                            <Link to={`/dashboard/payment/${item._id}`} className="btn btn-success btn-xs">Pay</Link>
                                        </div>
                                    </th>
                                </tr>)
                            }
                        </tbody>

                    </table> : <h3 className='text-center text-xl'>No Classes Found</h3>
                }
            </div>
        </div>
    );
};

export default MySelectedClasses;