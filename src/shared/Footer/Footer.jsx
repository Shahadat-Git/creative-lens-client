import React from 'react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className=" py-4 mt-5">

            <div className="border-t flex justify-center items-center flex-col text-center lg:gap-1  text-neutral-500">
                <p className='text-lg lg:text-3xl font-semibold my-5'>Creative Lens</p>
                <p>Photography School  since 2022</p>
                <p>2048 Cimmaron Road - Pomona - California</p>
                <p> Phone : 309-923-4534</p>
                <div className='flex gap-2 lg:gap-4 lg:text-lg'>
                    <BsFacebook></BsFacebook>
                    <BsInstagram></BsInstagram>
                    <BsTwitter></BsTwitter>
                </div>
                <p className='mt-5'>© 2022-2023 Creative Lens. All rights reserved.</p>

            </div>
        </footer>
    );
};

export default Footer;