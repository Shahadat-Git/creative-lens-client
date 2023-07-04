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
import MyClasses from "../pages/Dashboard/InstructorDashboard/MyClasses";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import ManageClasses from "../pages/Dashboard/AdminDashboard/ManageClasses";
import AdminRoute from "./AdminRoute";
import MyClassUpdate from "../pages/Dashboard/InstructorDashboard/MyClassUpdate";
import MySelectedClasses from "../pages/Dashboard/StudentDashboard/MySelectedClasses";
import StudentRoute from "./StudentRoute";
import MyEnrolledClasses from "../pages/Dashboard/StudentDashboard/MyEnrolledClasses";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Payment from "../pages/Dashboard/StudentDashboard/Payment";
import ErrorPage from "../pages/ErrorPage/ErrorPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
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
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            }
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

            // admin routes
            {
                path: 'manage-classes',
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },

            // instructor routes
            {
                path: 'add-class',
                element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
            },
            {
                path: 'my-classes',
                element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
            },
            {
                path: 'my-classes/update/:id',
                element: <InstructorRoute><MyClassUpdate></MyClassUpdate></InstructorRoute>
            },

            // student routes
            {
                path: 'my-selected-classes',
                element: <StudentRoute><MySelectedClasses></MySelectedClasses></StudentRoute>
            },
            {
                path: 'my-enrolled-classes',
                element: <StudentRoute><MyEnrolledClasses></MyEnrolledClasses></StudentRoute>
            },
            {
                path: 'payment/:id',
                element: <StudentRoute><Payment></Payment></StudentRoute>
            }
        ]
    }
])

export default router;