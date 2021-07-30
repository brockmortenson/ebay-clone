import React, { useState } from 'react';
import NavOne from './NavOne';
import NavTwo from './NavTwo';
import NavThree from './NavThree';
import { Link, useHistory } from 'react-router-dom'
import cartImg from '../images/cart.png';
import '../styles/header.css';

function Header(props) {
    const [ name, setName ] = useState(false);
    const [ cart, setCart ] = useState(false);
    const [ items, setItems ] = useState(false);

    const history = useHistory();

    const handleAccount = () => {
        let loggedIn = props.loggedIn;
        if (loggedIn) {
            let user = props.userProfile.username;
            history.push(`/Account/${user}`)
        }
    }

    const handleCart = () => {
        let loggedIn = props.loggedIn;
        if (loggedIn) {
            history.push('/Cart')
            setCart(false)
        }
    }

    const handleItems = () => {
        let loggedIn = props.loggedIn;
        if (loggedIn) {
            history.push('/SavedItems')
            setItems(false)
        }
    }

    const loggedInAccount = () => {
        let loggedIn = props.loggedIn;
        if (!loggedIn) {
            setName(true)
        } else {
            setName(false)
        }
    }

    const loggedInCart = () => {
        let loggedIn = props.loggedIn;
        if (!loggedIn) {
            setCart(true)
        } else {
            setCart(false)
        }
    }

    const loggedInItems = () => {
        let loggedIn = props.loggedIn;
        if (!loggedIn) {
            setItems(true)
        } else {
            setItems(false)
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
                        <p onClick={() => history.push('/About')}>About</p>
                        <p onClick={() => history.push('/Contact')}>Contact Us</p>
                    </div>
                    <div className='nav-one-group-two'>
                        <div
                            onClick={handleItems}
                            onMouseEnter={loggedInItems}
                            onMouseLeave={() => setItems(false)}
                        >
                            Saved Items
                            {
                                items
                                ?
                                <div className='condition'>
                                    <p>Sign In to view your saved items</p>
                                </div>
                                :
                                null
                            }
                        </div>
                        <div
                            onClick={handleAccount}
                            onMouseEnter={loggedInAccount}
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
                        <div
                            onClick={handleCart}
                            onMouseEnter={loggedInCart}
                            onMouseLeave={() => setCart(false)}
                        >
                            <img src={cartImg} alt='cart' />
                            {
                                cart
                                ?
                                <div className='condition'>
                                    <p>Sign In to view your cart</p>
                                </div>
                                :
                                null
                            }
                        </div>
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