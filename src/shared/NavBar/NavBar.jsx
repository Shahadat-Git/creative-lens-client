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
        <li><NavLink className={({ isActive }) =>
            isActive ? "active-link" : "inactive-link"
        }>Classes</NavLink></li>

        {
            user?.email && <li><NavLink className={({ isActive }) =>
                isActive ? "active-link" : "inactive-link"
            }>Dashboard</NavLink></li>
        }
    </>

    const themeBtn = <>
        <input defaultChecked={theme === 'dark' && 'true'} onClick={toggleTheme} type="checkbox" className="toggle" />
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