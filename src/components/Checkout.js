import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import '../styles/checkout.css';

function Checkout() {

    const handleToken = (token, addreses) => {
        console.log({ token, addreses })
    }
    
    return (
        <div className='Checkout'>
            <p>CHECKOUT</p>
            <div>
            </div>
        </div>
    );
}

export default Checkout;