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
            <div>
                {
                    classes.length > 0 && classes.map(item => <div key={item._id}>
                        <h2>Name : {item.name}</h2>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyClasses;