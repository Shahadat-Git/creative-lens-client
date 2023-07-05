import React from 'react';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Creative Lens | Home</title>
            </Helmet>
            <h2>This is home page</h2>
        </div>
    );
};

export default Home;