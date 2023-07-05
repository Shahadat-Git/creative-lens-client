import React from 'react';
import { Helmet } from 'react-helmet-async';
import Slider from './Slider';
import PopularClasses from './PopularClasses';
import PopularInstructor from './PopularInstructor';
import Advice from './Advice';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Creative Lens | Home</title>
            </Helmet>
            <Slider></Slider>
            <PopularClasses></PopularClasses>
            <PopularInstructor></PopularInstructor>
            <Advice></Advice>
        </div>
    );
};

export default Home;