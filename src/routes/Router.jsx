import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../layouts/Dashboard";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import PrivateRoute from "./PrivateRoute";
import AddClass from "../pages/Dashboard/InstructorDashboard/AddClass";
import InstructorRoute from "./InstructorRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <DashboardHome></DashboardHome>
            },
            {
                path: 'manage-user',
                element: <h2>hi</h2>
            },

            // instructor routes
            {
                path: 'add-class',
                element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
            }
        ]
    }
])

export default router;