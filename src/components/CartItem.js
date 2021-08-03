import React from 'react';
import { connect } from 'react-redux';
import '../styles/cartItem.css';

function CartItem(props) {
    console.log('Cart-Item Props:', props.products)

    return (
        <div className='CartItem'>
            cart item component
        </div>
    );
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(CartItem);