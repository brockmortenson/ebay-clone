import React from 'react';
import NavOne from './NavOne';
import NavTwo from './NavTwo';
import NavThree from './NavThree';
import { Link, useHistory } from 'react-router-dom'
import cartImg from '../images/cart.png';
import '../styles/header.css';

function Header(props) {

    const history = useHistory();

    let user = props.userProfile.username;

    const handleAccount = () => {
        history.push(`/Account/${user}`)
    }

    return (
        <div className='Header'>
            <div>
                <nav className='nav-one'>
                    <div className='nav-one-group-one'>
                        <NavOne
                            loggedIn={props.loggedIn}
                            userName={props.userName}
                            email={props.email}
                            userProfile={props.userProfile}
                        />
                        <p>About</p>
                        <p>Contact Us</p>
                    </div>
                    <div className='nav-one-group-two'>
                        <p>Saved Items</p>
                        <p onClick={handleAccount}>My Account</p>
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