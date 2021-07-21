import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navThree.css';

function NavThree() {

    return (
        <div className='NavThree'>
            <Link to='/'>Home</Link>
            <Link to='/Electronics'>Electronics</Link>
            <Link to='/Men'>Men's Apparel</Link>
            <Link to='/Women'>Women's Apparel</Link>
            <Link to='/Jewelry'>Jewelry</Link>
        </div>
    );
}

export default NavThree;