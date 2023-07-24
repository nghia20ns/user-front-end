import Header  from "./Header";
import SlideBar  from "./SlideBar";
import React from 'react';

const DefaultLayout = ({children}) => {
    return (
        <>
        <header >{<Header/>}</header>
        <div className='row'>
            <div className='col-sm-2'>
                <SlideBar/>
            </div>
                <div className='col-sm-8' style = {{marginTop: 50}}>
                    {children}
                </div>
            </div>

            </>
    );
};

export default DefaultLayout;