import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const PaymentHistory = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();
    const { data: classes = [], isLoading: isClassesLoading, } = useQuery({
        queryKey: ['classes', user?.email],
        enabled: user !== null,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })
    return (
        <div>
            <Helmet>
                <title>Dashboard | Payment History</title>
            </Helmet>
            <div className='flex justify-center items-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>Payment History</h3>
            </div>
            <div className="overflow-x-auto mt-4">
                {
                    classes?.length > 0 ? <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                classes.map(item => <tr key={item._id}>
                                    <td>
                                        {item.className}
                                    </td>
                                    <td>${item.price}</td>
                                    <td>${item.transactionId}</td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                        :
                        <h3 className='text-center text-xl'>No History Found</h3>
                }
            </div>
        </div>
    );
};

export default PaymentHistory;