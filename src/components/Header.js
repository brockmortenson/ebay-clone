import React, { useState } from 'react';
import NavOne from './NavOne';
import NavTwo from './NavTwo';
import NavThree from './NavThree';
import { useHistory } from 'react-router-dom'
import cartImg from '../images/cart.png';
import { connect } from 'react-redux';
import '../styles/header.css';

function Header(props) {
    const [ name, setName ] = useState(false);
    const [ cart, setCart ] = useState(false);
    const [ items, setItems ] = useState(false);

    // Hamburger Menu State
    const [ open, setOpen ] = useState(false);
    const [ checked, setChecked ] = useState(false);
    
    const history = useHistory();

    let loggedIn = props.user.isLoggedIn;
    let currentUser = props.user.user;
    
    const handleAccount = () => {
        if (loggedIn) {
            history.push(`/Account/${currentUser.username}`)
        }
    }

    const handleCart = () => {
        if (loggedIn) {
            history.push('/Cart')
            setCart(false)
        }
    }

    const handleItems = () => {
        if (loggedIn) {
            history.push('/SavedItems')
            setItems(false)
        }
    }

    const loggedInAccount = () => {
        if (!loggedIn) {
            setName(true)
        } else {
            setName(false)
        }
    }

    const loggedInCart = () => {
        if (!loggedIn) {
            setCart(true)
        } else {
            setCart(false)
        }
    }

    const loggedInItems = () => {
        if (!loggedIn) {
            setItems(true)
        } else {
            setItems(false)
        }
    }

    const handleOpen = () => {
        setOpen(!open)
        setChecked(!checked)
    }

    const handleChecked = () => {
        setOpen(!open)
        setChecked(!checked)
    }
    
    return (
        <div className='Header'>
            <div>
                <div>
                    <input className='toggler' type='checkbox' onClick={handleOpen} checked={checked}  />
                    <div className='hamburger'><div></div></div>
                </div>
                <nav className='nav-one'>
                    <div className='nav-one-group-one'>
                        <NavOne
                            loggedIn={loggedIn}
                            currentUser={currentUser}
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
                            <div>
                                <img src={cartImg} alt='cart' />
                                <p>{props.cart.cartCount}</p>
                            </div>
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
                {
                    open
                    ?
                    <nav className='toggled' onClick={handleChecked}>
                        <div>
                            <div className='nav-one-group-one'>
                                <NavOne
                                    loggedIn={loggedIn}
                                    currentUser={currentUser}
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
                                    <div>
                                        <img src={cartImg} alt='cart' />
                                        <p>{props.cart.cartCount}</p>
                                    </div>
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
                        </div>
                    </nav>
                    :
                    null
                }
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

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Header);