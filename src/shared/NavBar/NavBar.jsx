import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg'
import logo1 from '../../assets/logo1.png'
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineMenuAlt1, HiOutlineX } from 'react-icons/hi';
import useAuth from '../../hooks/useAuth';
import profile from '../../assets/profile.png';
import { toast } from 'react-hot-toast';


const NavBar = () => {
    const [openMenu, setOpenMenu] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem('theme'));
    const { user, logOut } = useAuth();


    const toggleTheme = (e) => {
        if (e.target.checked) {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            setTheme('light')
            localStorage.setItem('theme', 'light')

        }
    };


    useEffect(() => {
        // localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        setTheme(localTheme)
        document.querySelector('html').setAttribute('data-theme', theme);

    }, [theme])

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Successfully LoggedOut !')
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }


    const links = <>
        <li><NavLink to='/' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Home</NavLink></li>
        <li><NavLink to='/instructors' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Instructors</NavLink></li>
        <li><NavLink to='/classes' className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Classes</NavLink></li>

        {
            user?.email && <li><NavLink to={'/dashboard'} className={({ isActive }) =>
                isActive ? "active-link" : "inactive-link"
            }>Dashboard</NavLink></li>
        }
    </>

    const themeBtn = <>
        <label className="swap swap-rotate">

            {/* this hidden checkbox controls the state */}
            <input defaultChecked={theme === 'dark' && 'true'} onClick={toggleTheme} type="checkbox" />

            <svg className="swap-on fill-current w-7 h-w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

            <svg className="swap-off fill-current w-7 h-w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

        </label>
    </>
    return (
        <header>
            <nav className='hidden lg:block'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col items-center'>
                        <img className='w-[75px] h-[75px]' src={theme === 'dark' ? logo1 : logo} alt="" />
                        <h2 className='text-2xl lg:text-3xl font-semibold -mt-2 lg:-mt-2 '><Link to='/'>Creative Lens</Link></h2>
                    </div>
                    <div>
                        <ul className='flex gap-3'>
                            {links}
                        </ul>
                    </div>
                    <div className='flex items-center gap-2'>
                        {themeBtn}
                        {
                            user ? <div className="hidden lg:block dropdown dropdown-end">
                                <div className='flex p-1 shadow-lg rounded-full'>
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-30 rounded-full">
                                            <img className='w-full' title={user.displayName && user.displayName} src={user.photoURL ? user.photoURL : profile} />
                                        </div>
                                    </label>
                                </div>
                                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    <li onClick={handleLogOut}><p>Logout</p></li>
                                </ul>
                            </div>

                                :
                                <div>
                                    <Link to='/login' className='btn'>Login</Link>
                                </div>
                        }
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
                        <img className='w-[50px] h-[50px]' src={theme === 'dark' ? logo1 : logo} alt="" />
                        <h2 className='text-2xl lg:text-3xl font-semibold -mt-2 lg:-mt-4 '><Link to='/'>Creative Lens</Link></h2>
                    </div>

                    {
                        user ? <div className='w-2/12 flex items-center gap-2'>
                            <div className="dropdown dropdown-end">
                                <div className='flex p-1 shadow-lg rounded-full'>
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-30 rounded-full">
                                            <img className='w-full' title={user.displayName && user.displayName} src={user.photoURL ? user.photoURL : profile} />
                                        </div>
                                    </label>
                                </div>
                                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    <li onClick={handleLogOut}><p>Logout</p></li>
                                </ul>
                            </div>
                        </div>

                            :
                            <div className='w-2/12 flex items-center gap-2'>
                                <Link to='/login' className='btn btn-sm'>Login</Link>
                            </div>
                    }
                </div>
                <hr className='shadow border mt-2' />

                {
                    openMenu && <div>
                        <ul className='flex flex-col items-center gap-2 mt-2'>
                            {links}
                            <li>{themeBtn}</li>
                        </ul>
                        <hr className='shadow border mt-2' />
                    </div>
                }
            </nav>
        </header>
    );
};

export default NavBar;