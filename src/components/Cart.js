import React from 'react';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import '../styles/cart.css';

function Cart() {

    return (
        <div className='Cart'>
            <p>YOUR CART</p>
            <div className='cart-view'>
                <CartItem />
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(Cart);