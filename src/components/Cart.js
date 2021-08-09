import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import { emptyCart } from '../redux/cartReducer';
import StripeCheckout from 'react-stripe-checkout';
import '../styles/cart.css';

function Cart(props) {
    // const [ quantity, setQuantity ] = useState(0);
    
    const [ sum, setSum ] = useState(0);
    const [ final, setFinal ] = useState(0);

    let count = props.cart.cartCount;

    let tax = 0
    
    let subTotal = 0;

    let total = 0;
    
    const withTax = count === 0 ? tax = 0 : tax = 3.72; 

    useEffect(() => {
        props.cart.cart.map((item) => {
            subTotal += item.price;
            setSum(subTotal);
            total = Math.round((subTotal + withTax) * 100) / 100;
            setFinal(total);
        })
    }, [count])

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
                {/* {
                    props.cart.cart.map((item) => {
                        if (item.id === item.id) {
                            props.cart.cart.splice(item)
                        }
                        return <CartItem key={item.id} itemData={item} />
                    })
                } */}
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
                                <button onClick={() => props.emptyCart()}>Checkout</button>
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