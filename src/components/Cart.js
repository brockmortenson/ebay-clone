import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import { emptyCart } from '../redux/cartReducer';
import { useHistory } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import '../styles/cart.css';

function Cart(props) {

    const history = useHistory();

    const [ sum, setSum ] = useState(0);
    const [ final, setFinal ] = useState(0);

    let count = props.cart.cartCount;

    const tax = 3.72
    
    let subTotal = 0;

    let total = 0;

    useEffect(() => {
        props.cart.cart.map((item) => {
            subTotal += item.price;
            setSum(subTotal);
            total = subTotal + tax;
            setFinal(total);
        })
    }, [])

    // ADD ITEM TO DEPENDENCY ARRAY TO UPDATE 
    // IF ITEM QUANTITY IS ADJUSTED IN CART

    const handleToken = (token, addreses) => {
        console.log({ token, addreses })
    }

    const handleEmpty = () => {
        props.emptyCart();
        setSum(0);
        setFinal(0);
    }

    return (
        <div className='Cart'>
            <p>YOUR CART</p>
            <button onClick={handleEmpty}>Empty cart</button>
            <div className='cart-view'>
                <CartItem />
                <section>
                    <h2>Cart Totals</h2>
                    <div>
                        <span>
                            Items in cart:
                            <p>{count}</p>
                        </span>
                        <span>
                            Subtotal:
                            <p>${sum}</p>
                        </span>
                        <span>
                            Tax:
                            <p>${tax}</p>
                        </span>
                        <span>
                            Total:
                            <p>${final}</p>
                        </span>
                        {/* <button onClick={() => history.push('/Checkout')}>
                            <p>Proceed To Checkout</p>
                            <p>&#11166;</p>
                        </button> */}

                        {/* I was unable to find information on how to
                        style the stripe checkout component so that it
                        matches the them of the website */}
                        {
                            count !== 0
                            ?
                            <StripeCheckout
                            name='SGGE Store'
                            stripeKey='pk_test_51JLCSPB3v1oPbZHDchBQAwyyUIHKcHunxtVZtMsLM3ITRvaojdMfaADZaD7QzOaQMi7NOL3uiPFedgbnJe9qK12h00exbrKN34'
                            token={handleToken}
                            billingAddress
                            shippingAddress
                            amount={final * 100}
                            >
                            <button>Checkout</button>
                        </StripeCheckout>
                        :
                        null
                        }
                        <div>
                            Note: Enter your card information as seen below to imitate a successful checkout
                            <p>Card Number: '4242 4242 4242 4242'</p>
                            <p>Expiration date: '04/24'</p>
                            <p>CVC: '424'</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, { emptyCart })(Cart);