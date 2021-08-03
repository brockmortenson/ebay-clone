import React from 'react';
import CartItem from './CartItem';
import store from '../redux/store';
import { connect } from 'react-redux';
import '../styles/cart.css';

function Cart(props) {
    // console.log(props)
    console.log('Cart component store:', store.getState().cart)
    return (
        <div className='Cart'>
            <p>YOUR CART</p>
            <CartItem products={props.cart} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        cart: state
    }
}

export default connect(mapStateToProps)(Cart);