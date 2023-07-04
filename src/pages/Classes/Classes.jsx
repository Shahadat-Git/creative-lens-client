import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import noImg from '../../assets/no-img.jpg';
import useUserStatus from '../../hooks/useUserStatus';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [axiosSecure] = useAxiosSecure();
    const [status] = useUserStatus();
    const { user } = useAuth();
    useEffect(() => {
        const getData = async () => {
            const res = await axiosSecure.get('/classes/approved')
            const { data } = res;
            setClasses(data)
        }
        getData();
    }, [])

    const handleSelect = (item) => {
        if (!user) {
            return toast.error('Please log in before selection the course');
        }
        // console.log(id)
        const cartData = {
            classId: item?._id,
            img: item?.img,
            name: item?.name,
            instructorName: item?.instructorName,
            price: item?.price,
            email: user?.email,
        }
        axiosSecure.post('/carts', cartData)
            .then(res => {
                // console.log(res.data)
                if (res.data.insertedId) {
                    toast.success('Selected this class');
                };
            })
    }
    return (
        <div>
            <div className='flex justify-center items-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>All Classes</h3>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 px-5 my-10'>
                {
                    classes.length > 0 && classes.map(item => <div key={item._id}>
                        <div className={`${item.seats == 0 ? 'bg-red-600' : 'bg-base-100 '} card w-full shadow-xl `}>
                            <div className="p-10">
                                <img src={item.img || noImg} className=" rounded-xl border-2 h-72 w-full object-cover" />
                            </div>
                            <div className="card-body ">
                                <h2 className="text-xl font-semibold">Name : {item.name}</h2>
                                <p className="text-md font-semibold"> Instructor name : {item.instructorName}</p>
                                <p className="text-md font-semibold"> Available seats : {item.seats}</p>
                                <p className="text-md font-semibold"> Price : {item.price}</p>
                                <button onClick={() => handleSelect(item)} disabled={item.seats == 0 || status?.status === 'admin' || status?.status === 'instructor' && true} className='btn btn-success hover:bg-green-600'>Select</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>


        </div>
    );
};

export default Classes;