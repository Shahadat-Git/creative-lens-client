import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import useAuth from '../../../hooks/useAuth';

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
    console.log(classes)
    return (
        <div>
            <h2 className='text-5xl text-center my-5 font-semibold'>My Classes</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 px-5'>
                {
                    classes.length > 0 && classes.map(item => <div key={item._id}>
                        <div className="card w-full bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={item.img} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body ">
                                <h2 className="text-2xl font-semibold">Name : {item.name}</h2>
                                <p className='text-lg font-semibold'>Status : <span className={item.status === 'pending' ? 'text-warning' : item.status === 'approved' ? 'text-success' : ' text-error'}>{item.status}</span> </p>
                                <p className='text-lg font-semibold'> Total Enrolled Student : <span className=''>{item.enrolled ? item.enrolled : '0'}</span></p>
                                {
                                    item?.feedback === 'denied' && <p className='text-lg font-semibold'> Feedback : <span className=''>{item?.feedback}</span></p>
                                }
                                <button className='btn bg-orange-200 hover:bg-orange-300'>Update</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyClasses;