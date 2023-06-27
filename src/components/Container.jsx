import React, { useEffect } from 'react';

const Container = ({children}) => {

    useEffect(() => {
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', localTheme);

    }, [])

    return (
        <div className='container mx-auto px-1 lg:px-0'>
           {children} 
        </div>
    );
};

export default Container;