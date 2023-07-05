import React from 'react';
import { Helmet } from 'react-helmet-async';
import Slider from './Slider';
import PopularClasses from './PopularClasses';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Creative Lens | Home</title>
            </Helmet>
            <Slider></Slider>
            <PopularClasses></PopularClasses>
        </div>
    );
};

export default Home;