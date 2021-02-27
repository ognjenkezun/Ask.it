import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Page(props) {
    return (
        <div>
            <Navbar history={props.history}/>
                { props.children }
            <Footer/>
        </div>
    )
}
