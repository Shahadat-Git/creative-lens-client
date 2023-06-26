import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login/Login';

const Dashboard = () => {
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
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;