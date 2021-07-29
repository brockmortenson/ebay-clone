import React, { useState } from 'react';
import NavOne from './NavOne';
import NavTwo from './NavTwo';
import NavThree from './NavThree';
import { Link, useHistory } from 'react-router-dom'
import cartImg from '../images/cart.png';
import '../styles/header.css';

function Header(props) {
    const [ name, setName ] = useState(false)

    const history = useHistory();

    const handleAccount = () => {
        let loggedIn = props.loggedIn;
        if (loggedIn) {
            let user = props.userProfile.username;
            history.push(`/Account/${user}`)
        }
    }

    const handleLoggedIn = () => {
        let loggedIn = props.loggedIn;
        if (!loggedIn) {
            setName(true)
        } else {
            setName(false)
        }
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
                        <div>Saved Items</div>
                        <div
                            onClick={handleAccount}
                            onMouseEnter={handleLoggedIn}
                            onMouseLeave={() => setName(false)}
                        >
                            My Account
                            {
                                name
                                ?
                                <div className='condition'>
                                    <p>Sign In to view your account</p>
                                </div>
                                :
                                null
                            }
                        </div>
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