import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useUserStatus from '../hooks/useUserStatus';
import NavBar from '../shared/NavBar/NavBar';
import Footer from '../shared/Footer/Footer';
import { BiSolidAddToQueue, BiSolidSelectMultiple, BiHistory } from 'react-icons/bi'
import { AiFillCrown, AiFillHome } from 'react-icons/ai'
import { MdManageAccounts, MdOutlineManageHistory, MdPaid } from 'react-icons/md'


const Dashboard = () => {
    const [status] = useUserStatus();
    const user = status?.status;


    const studentLinks = <>
        <li><NavLink to='/dashboard/my-selected-classes' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }><BiSolidSelectMultiple></BiSolidSelectMultiple>My Selected Classes</NavLink></li>
        <li><NavLink to='/dashboard/my-enrolled-classes' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }><MdPaid></MdPaid> My Enrolled Classes</NavLink></li>
        <li><NavLink to='/dashboard/payment-history' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }><BiHistory></BiHistory>Payment History</NavLink></li>
    </>

    const instructorLinks = <>
        <li><NavLink to='/dashboard/add-class' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }><BiSolidAddToQueue></BiSolidAddToQueue> Add a Class</NavLink></li>
        <li><NavLink to='/dashboard/my-classes' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }><AiFillCrown></AiFillCrown> My Classes</NavLink></li>

    </>

    const adminLinks = <>
        <li><NavLink to='/dashboard/manage-classes' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }><MdOutlineManageHistory></MdOutlineManageHistory> Manage Classes</NavLink></li>
        <li><NavLink to='/dashboard/manage-users' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }><MdManageAccounts></MdManageAccounts> Manage Users</NavLink></li>

    </>


    const freeLinks = <>
        <li><NavLink to='/' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Home</NavLink></li>
        <li><NavLink to='/instructors' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Instructors</NavLink></li>
        <li><NavLink to='/classes' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Classes</NavLink></li>
    </>
    return (
        <>
            <NavBar></NavBar>
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
                        <h3 className='text-xl border-b-2 font-semibold mb-5 p-4 text-center'>Dashboard  Menu</h3>
                        <li><Link to='/dashboard' className='inactive-link'><AiFillHome></AiFillHome>Dashboard Home</Link></li>
                        {
                            user === 'student' && studentLinks
                        }
                        {
                            user === 'instructor' && instructorLinks
                        }
                        {
                            user === 'admin' && adminLinks
                        }

                        {/* <hr className='border-t-2 my-5' />

                        {freeLinks} */}
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Dashboard;