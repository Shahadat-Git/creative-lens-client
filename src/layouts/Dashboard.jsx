import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useUserStatus from '../hooks/useUserStatus';


const Dashboard = () => {
    const [status] = useUserStatus();
    const user = status?.status;


    const studentLinks = <>
        <li><NavLink to='/' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>My Selected Classes</NavLink></li>
        <li><NavLink to='/instructors' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>My Enrolled Classes</NavLink></li>
    </>

    const instructorLinks = <>
        <li><NavLink to='/' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Add a Class</NavLink></li>
        <li><NavLink to='/instructors' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>My Classes</NavLink></li>

    </>

    const adminLinks = <>
        <li><NavLink to='/' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Manage Classes</NavLink></li>
        <li><NavLink to='/instructors' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Manage Users</NavLink></li>

    </>


    const freeLinks = <>
        <li><NavLink to='/' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Home</NavLink></li>
        <li><NavLink to='/instructors' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Instructors</NavLink></li>
        <li><NavLink className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Classes</NavLink></li>
    </>
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className=' flex flex-col items-center justify-center'>
                    <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden mt-5">Dashboard Menu</label>
                </div>

                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {
                        user === 'student' && studentLinks
                    }
                    {
                        user === 'instructor' && instructorLinks
                    }
                    {
                        user === 'admin' && adminLinks
                    }

                    <hr className='border-t-2 my-5' />

                    {freeLinks}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;