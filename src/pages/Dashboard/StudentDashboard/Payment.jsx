import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [axiosSecure] = useAxiosSecure();
    const [cart, setCart] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axiosSecure.get(`/cart/${id}`)
            .then(res => {
                console.log(res.data)
                setCart(res.data)
            })
    }, [id])
    return (
        <div>
            <div className='flex justify-center items-center'>
                <h3 className='text-xl mt-5 lg:text-5xl shadow-lg inline-block px-10 py-1 lg:py-4 rounded-full'>Payment</h3>
            </div>
            <p className='text-2xl font-semibold bg-info p-4  rounded-lg mt-5'>Total Amount : ${cart?.price}</p>
            <div className='bg-base-200 py-3'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm cart={cart} price={cart?.price}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;