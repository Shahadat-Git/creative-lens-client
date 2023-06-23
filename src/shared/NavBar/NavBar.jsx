import React, { useState } from 'react';
import logo from '../../assets/logo.svg'
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineMenuAlt1, HiOutlineX } from 'react-icons/hi';


const NavBar = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const links = <>
        <li><NavLink to='/' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Home</NavLink></li>
        <li><NavLink to='/instructors' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Instructors</NavLink></li>
        <li><NavLink className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Classes</NavLink></li>
        <li><NavLink className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Dashboard</NavLink></li>
    </>
    return (
        <header>
            <nav className='hidden lg:block'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col items-center'>
                        <img className='w-[50px] lg:w-[75px]' src={logo} alt="" />
                        <h2 className='text-2xl lg:text-3xl font-semibold -mt-2 lg:-mt-4 '>Creative Lens</h2>
                    </div>
                    <div>
                        <ul className='flex gap-3'>
                            {links}
                        </ul>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" className="toggle" />
                        <button className='btn'>Login</button>
                    </div>
                </div>
                <hr className='shadow border mt-2' />
            </nav>






            {/* for mobile */}
            <nav className='lg:hidden'>
                <div className='flex justify-between px-5 mt-2'>
                    <div className='w-2/12 flex items-center gap-2'>
                        {
                            openMenu ? <HiOutlineX onClick={() => setOpenMenu(!openMenu)} className='text-2xl'></HiOutlineX> :
                                <HiOutlineMenuAlt1 onClick={() => setOpenMenu(!openMenu)} className='text-2xl'></HiOutlineMenuAlt1>
                        }


                    </div>
                    <div className='w-8/12 flex flex-col items-center'>
                        <img className='w-[50px] lg:w-[75px]' src={logo} alt="" />
                        <h2 className='text-2xl lg:text-3xl font-semibold -mt-2 lg:-mt-4 '>Creative Lens</h2>
                    </div>
                    <div className='w-2/12 flex items-center gap-2'>
                        <button className='btn btn-sm'>Login</button>
                    </div>
                </div>
                <hr className='shadow border mt-2' />

                {
                    openMenu && <div>
                        <ul className='flex flex-col items-center gap-2 mt-2'>
                            {links}
                            <li><input type="checkbox" className="toggle" /></li>
                        </ul>
                        <hr className='shadow border mt-2' />
                    </div>
                }
            </nav>
        </header>
    );
};

export default NavBar;