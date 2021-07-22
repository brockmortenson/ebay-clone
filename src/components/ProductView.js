import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import store from '../redux/store';
import { addToCart } from '../redux/cartReducer';
import { connect } from 'react-redux';
import '../styles/productView.css';

function ProductView(props) {
    const [ user, setUser ] = useState(false);
    const [ item, setItem ] = useState([]);
    let str = '';

    useEffect(() => {
        str = props.location.pathname
        // regex borrowed from stack overflow
        let id = str.replace( /^\D+/g, '');
        axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                setItem(res.data)
                // console.log(res.data)
            })
        // console.log(props)
        // console.log(id)
    }, []);

    let loggedIn = store.getState().user.isLoggedIn;

    const handleClick = () => {
        // console.log(store.getState().user.isLoggedIn)
        if (!loggedIn) {
            setUser(true)
        } else {
            setUser(false)
        }

        addItem()
    }

    // CREATE ENDPOINT AND CONTROLLER FOR CART
    const addItem = () => {
        props.addToCart(item)
    }

    return (
        <div className='ProductView'>
            <div className='item'>
                <img src={item.image} />
                <div>
                    <div className='title'>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                    <div>Price: ${item.price}</div>
                    <div>
                        <button
                            onClick={handleClick}
                            style={{ textDecoration: 'none' }}
                        >
                            Add to cart
                        </button>
                        {
                        user
                        ?
                            <div className='log-in'>
                                <span>
                                    Please
                                    <Link to='/Login' style={{ textDecoration: 'none' }}><p>Login</p></Link>
                                    or
                                    <Link to='/Register' style={{ textDecoration: 'none' }}><p>Register</p></Link>
                                    in order to add this item to your cart
                                </span>
                            </div>
                        :
                        null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => { return state }

export default connect(mapStateToProps, { addToCart })(ProductView);