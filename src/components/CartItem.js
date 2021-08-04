import React from 'react';
import { connect } from 'react-redux';
import cartImg from '../images/cart.png';
import '../styles/cartItem.css';

function CartItem(props) {
    
    const mappedCart = props.cart.cart.map((item) => {
        return (
            <div key={item.id} className='cart-items'>
                <img id='cart-img' src={item.image} alt={item.title} />
                <div>
                    <p>{item.title}</p>
                </div>
                <div>${item.price}</div>
                <div>
                    <button>-</button>
                    <span>Quantity</span>
                    <button>+</button>
                </div>
                <button>Remove</button>
            </div>
        );
    })

    return (
        <div className='CartItem'>
            <div>
                {
                    mappedCart.length !== 0
                    ?
                    mappedCart
                    :
                    <div>
                        <img src={cartImg} alt='cart-img' />
                        <h2>Your shopping cart is empty</h2>
                        <p>Once you have added items to your cart, you will see be able to see them here.</p>
                    </div>
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(CartItem);