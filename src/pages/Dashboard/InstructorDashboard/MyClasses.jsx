import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import noImg from '../../../assets/no-img.jpg';

const MyClasses = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [] } = useQuery({
        queryKey: ['email', user.email],
        queryFn: async () => {
            const res = await axiosSecure(`/my-classes/${user?.email}`)
            return res.data;
        }
    })
    // console.log(classes)
    return (
        <div>
            <div className='flex justify-center items-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>My Classes</h3>
            </div>
            <div className='grid grid-cols-1  gap-5 px-5 my-5'>
                {
                    classes.length > 0 && classes.map(item => <div key={item._id}>
                        <div className="w-full bg-base-100 shadow-xl lg:flex rounded items-center">
                            <div className="p-5 lg:w-4/12">
                                <img className='w-full rounded-xl' src={item.img || noImg} />
                            </div>
                            <div className="card-body lg:w-8/12 ">
                                <h2 className="text-2xl font-semibold">Name : {item.name}</h2>
                                <p className='text-lg font-semibold'>Status : <span className={item.status === 'pending' ? 'text-warning' : item.status === 'approved' ? 'text-success' : ' text-error'}>{item.status}</span> </p>
                                <p className='text-lg font-semibold'> Total Enrolled Student : <span className=''>{item.enrolled ? item.enrolled : '0'}</span></p>
                                {
                                    item?.status === 'denied' && <p className='text-lg font-semibold'> Feedback : <span className=''>{item?.feedback}</span></p>
                                }
                                <Link to={`/dashboard/my-classes/update/${item._id}`} className='btn bg-orange-200 hover:bg-orange-300'>Update</Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyClasses;