import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PopularClasses = () => {
    const [classes, setClasses] = useState([]);
    const [axiosSecure] = useAxiosSecure();
    useEffect(() => {
        const getData = async () => {
            const res = await axiosSecure.get('/classes/popular')
            const { data } = res;
            setClasses(data)
        }
        getData();
    }, [])

    console.log(classes)

    return (
        <div>
            <div className='flex justify-center items-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>Popular Classes</h3>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 px-5 my-10'>
                {
                    classes?.length > 0 && classes.map(item => <div key={item._id}>
                        <div className="card w-full shadow-xl">
                            <div className="p-10">
                                <div style={{ background: `url(${item.img})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} className=" rounded-xl  h-72 w-full relative shadow">
                                    <h2 className='bg-neutral text-white absolute w-full bottom-5 text-center text-lg'>{item?.name}</h2>
                                </div>
                            </div>

                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default PopularClasses;