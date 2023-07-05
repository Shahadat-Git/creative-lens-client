import React from 'react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className=" py-4 rounded-lg mt-5">

            <div className="border-t flex justify-center items-center flex-col text-center gap-2 font-mono text-neutral-500">
                <p className='text-3xl font-semibold mt-5'>Creative Lens</p>
                <p>Photography School  since 2022</p>
                <p>2048 Cimmaron Road - Pomona - California</p>
                <p> Phone : 309-923-4534</p>
                <div className='flex gap-4 text-lg'>
                    <BsFacebook></BsFacebook>
                    <BsInstagram></BsInstagram>
                    <BsTwitter></BsTwitter>
                </div>
                <p>© 2022-2023 Creative Lens. All rights reserved.</p>

            </div>
        </footer>
    );
};

export default Footer;