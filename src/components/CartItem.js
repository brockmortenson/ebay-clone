import React, { useEffect } from 'react';
import ProductView from './ProductView';
import '../styles/cartItem.css';

function CartItem(props) {
    // console.log(props)
    // let str = '';

    // useEffect(() => {
    //     str = props.location.pathname;
        
    // })
    console.log('Cart-Item Props:', props)

    return (
        <div className='CartItem'>
            cart item component
        </div>
    );
}

export default CartItem;