import React from 'react';
import CartItem from './CartItem';
import '../styles/cart.css';

function Cart(props) {
    // console.log(props)
    return (
        <div className='Cart'>
            <p>YOUR CART</p>
            <CartItem />
        </div>
    );
}

export default Cart;