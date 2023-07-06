import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import noImg from '../../../assets/no-img.jpg'
import { Helmet } from 'react-helmet-async';

const ManageClasses = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [classId, setClassId] = useState(null);
    const [classData, setClassData] = useState(null);
    const { data: classes = null, refetch, isLoading } = useQuery({
        queryKey: ['classes', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes')
            return res.data;
        }
    })
    // console.log(classes)
    const handleApproved = (id) => {
        // console.log(id)
        axiosSecure.patch(`/class/${id}`, { status: 'approved' })
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class Approved',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }

    const handleDenied = (id) => {
        axiosSecure.patch(`/class/${id}`, { status: 'denied' })
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class Denied',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }

    const handleFeedback = async (id) => {
        setClassData('');
        // console.log(id)
        setClassId(id)
        const res = await axiosSecure.get(`/class/${id}`);
        setClassData(res.data);
        window.feedback_modal.showModal();

    }
    const handleFeedbackModal = (event) => {
        const feedback = event.target.parentNode.firstChild.value;
        // console.log(feedback);
        axiosSecure.put(`/class/${classId}`, { feedback: feedback })
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Updated Feedback',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }
    return (
        <div>
            <Helmet>
                <title>Dashboard | Manage Classes</title>
            </Helmet>
            <div className='flex justify-center items-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>Manage Classes</h3>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 px-5 my-10'>
                {
                    !classes ? "Loading..." : classes.length > 0 ? classes.map(item => <div key={item._id}>
                        <div className="card w-full bg-base-100 shadow-xl">
                            <div className="px-10 pt-10">
                                <img src={item.img || noImg} className=" rounded-xl border-2 h-72 w-full object-cover" />
                            </div>
                            <div className="card-body ">
                                <h2 className="text-xl font-semibold">Name : {item.name}</h2>
                                <p className="text-md font-semibold"> Instructor name : {item.instructorName}</p>
                                <p className="text-md font-semibold"> Instructor email : {item.instructorEmail}</p>
                                <p className="text-md font-semibold"> Available seats : {item.seats}</p>
                                <p className="text-md font-semibold"> Price : ${item.price}</p>
                                <p className='text-md font-semibold'>Status : <span className={item.status === 'pending' ? 'text-warning' : item.status === 'approved' ? 'text-success' : ' text-error'}>{item.status}</span> </p>
                                <button onClick={() => handleApproved(item._id)} className='btn btn-success hover:bg-green-500' disabled={item.status !== 'pending' && true}>Approve</button>
                                <button onClick={() => handleDenied(item._id)} className='btn btn-error hover:bg-red-500' disabled={item.status !== 'pending' && true}>Deny</button>
                                <button onClick={() => handleFeedback(item._id)} className='btn btn-info hover:bg-blue-400' disabled={item.status === 'pending' && true}>Feedback</button>
                            </div>
                        </div>
                    </div>)
                        : <h3 className='text-center text-xl'>No Classes Found</h3>
                }
            </div>

            {/* modal body */}
            <dialog id="feedback_modal" className="modal">
                <form method="dialog" className="modal-box w-11/12 lg:w-8/12 max-w-5xl">
                    <div>
                        <textarea defaultValue={classData?.feedback ? classData?.feedback : ''} name='feedback' rows={5} className="textarea textarea-bordered w-full" placeholder="Feedback"></textarea>
                        <button onClick={handleFeedbackModal} className='btn btn-neutral mt-2'>Send</button>
                    </div>
                    <div className="modal-action">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn">Close</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default ManageClasses;