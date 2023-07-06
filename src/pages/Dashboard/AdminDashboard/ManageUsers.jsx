import React from 'react';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import noImg from '../../../assets/no-img.jpg'
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const ManageUsers = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: users = null, refetch, isLoading } = useQuery({
        queryKey: ['email', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    const handleInstructor = (id) => {
        axiosSecure.patch(`/users/${id}`, { role: 'instructor' })
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'User role updated',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }

    const handleAdmin = (id) => {
        axiosSecure.patch(`/users/${id}`, { role: 'admin' })
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'User role updated',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }


    return (
        <div>
            <Helmet>
                <title>Dashboard | Manage Users</title>
            </Helmet>
            <div className='flex justify-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>Manage Users</h3>
            </div>
            <div className="overflow-x-auto mt-4">
                {
                    !users ? "Loading..." : users.length > 0 ? <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Info</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !isLoading && users.length > 0 && users.map(item => <tr key={item._id}>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.img || noImg} alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p title={item.email}>{item.name}</p>
                                    </td>
                                    <td><p className={`${item.role === 'admin' && 'text-warning' || item.role === 'instructor' && 'text-info'} font-semibold text-[1rem]`}>{item.role}</p></td>
                                    <th>
                                        <div className='flex gap-2'>
                                            <button disabled={item.role === 'instructor'} onClick={() => handleInstructor(item._id)} className="btn  btn-xs btn-info"> Make Instructor</button>
                                            <button disabled={item.role === 'admin'} onClick={() => handleAdmin(item._id)} className="btn  btn-xs btn-warning">Make Admin</button>
                                        </div>
                                    </th>
                                </tr>)
                            }
                        </tbody>

                    </table> : <h3 className='text-center text-xl'>No Users Found</h3>
                }
            </div>
        </div>
    );
};

export default ManageUsers;