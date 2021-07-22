import React from 'react';
import NavOne from './NavOne';
import NavTwo from './NavTwo';
import NavThree from './NavThree';
import { Link } from 'react-router-dom'
import cartImg from '../images/cart.png';
import '../styles/header.css';

function Header(props) {

    return (
        <div className='Header'>
            <div>
                <nav className='nav-one'>
                    <div className='nav-one-group-one'>
                        <NavOne
                            loggedIn={props.loggedIn}
                            userName={props.userName}
                            email={props.email} />
                        <p>About</p>
                        <p>Contact Us</p>
                    </div>
                    <div className='nav-one-group-two'>
                        <p>Saved Items</p>
                        <p>My Account</p>
                        <Link to='/Cart'><img src={cartImg} alt='cart' /></Link>
                    </div>
                </nav>
                <nav className='nav-two'>
                    <NavTwo />
                </nav>
                <nav className='nav-three'>
                    <NavThree />
                </nav>
            </div>
        </div>
    );
}

export default Header;