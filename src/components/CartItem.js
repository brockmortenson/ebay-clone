import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart, adjustQuantity, addToCart } from '../redux/cartReducer';
import cartImg from '../images/cart.png';
import { useHistory } from 'react-router-dom';
import '../styles/cartItem.css';

function CartItem(props) {

    const history = useHistory();
    
    const mappedCart = props.cart.cart.map((item, index) => {
        const handlePush = () => history.push(`/ProductView/${item.id}`)

        return (
            <div key={index} className='cart-items'>
                <div onClick={handlePush}>
                    <img
                        id='cart-img'
                        src={item.image}
                        alt={item.title}
                    />
                    <div>
                        <p>{item.title}</p>
                    </div>
                    <div>${item.price}</div>
                </div>
                <br />
                <button onClick={() => props.removeFromCart(item)}>Remove</button>
            </div>
        );
    })

    let border = '';

    const styles = mappedCart.length === 0 ? border = 'none' : null

    return (
        <div className='CartItem'>
            <div style={{ border: styles }}>
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

export default connect(mapStateToProps, { removeFromCart, adjustQuantity, addToCart })(CartItem);