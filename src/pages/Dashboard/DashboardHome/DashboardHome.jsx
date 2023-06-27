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
                <h3 className='text-5xl shadow-lg inline-block px-10 py-2 rounded-full'>Dashboard</h3>
            </div>
            <div className='flex flex-col items-center gap-2 justify-center mt-10'>
                <img className='w-[200px] h-[200px] rounded-full shadow-2xl' src={user && user?.photoURL ? user?.photoURL : profile} alt="" />
                {
                    user &&
                    <>
                        <p>Name :</p>
                        <h3 className='text-xl'>{user?.displayName}</h3>
                        <p>Email :</p>
                        <h3 className='text-xl'>{user?.email}</h3>
                        <p>Role :</p>
                        <h3 className='text-xl'>{status?.status}</h3></>
                }
            </div>
        </div>
    );
};

export default DashboardHome;