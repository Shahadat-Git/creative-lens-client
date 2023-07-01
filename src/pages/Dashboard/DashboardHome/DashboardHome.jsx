import React from 'react';
import useAuth from '../../../hooks/useAuth';
import profile from '../../../assets/profile.png'
import useUserStatus from '../../../hooks/useUserStatus';


const DashboardHome = () => {
    const { user } = useAuth();
    const [status] = useUserStatus();
    return (
        <div className='mt-5'>
            <div className='flex justify-center'>
                <h3 className='text-2xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-2 rounded-full'>Dashboard</h3>
            </div>
            <div className='flex flex-col items-center gap-2 justify-center mt-10'>
                <img className='w-[100px] lg:w-[200px] h-[100px] lg:h-[200px] rounded-full shadow-2xl' src={user && user?.photoURL ? user?.photoURL : profile} alt="" />
                {
                    user &&
                    <>
                        <div className='flex flex-col items-center gap-2'>
                            <h3 className='lg:text-xl'> Name : {user?.displayName}</h3>
                            <h3 className='lg:text-xl'>Email : {user?.email}</h3>
                            <h3 className='lg:text-xl'>Role : {status?.status}</h3>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default DashboardHome;