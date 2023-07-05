import React from 'react';
import { Helmet } from 'react-helmet-async';
import Slider from './Slider';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Creative Lens | Home</title>
            </Helmet>
            <Slider></Slider>
        </div>
    );
};

export default Home;