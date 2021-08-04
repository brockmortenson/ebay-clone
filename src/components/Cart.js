import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { connect } from 'react-redux';
import '../styles/cart.css';

function Cart(props) {

    const [ sum, setSum ] = useState(0);
    const [ final, setFinal ] = useState(0);

    let count = props.cart.cartCount;

    const tax = 3.78
    
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

    return (
        <div className='Cart'>
            <p>YOUR CART</p>
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
                        <button>
                            <p>Proceed To Checkout</p>
                            <p>&#11166;</p>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(Cart);