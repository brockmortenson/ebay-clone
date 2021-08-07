import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../redux/cartReducer';
import cartImg from '../images/cart.png';
import '../styles/cartItem.css';
import { useHistory } from 'react-router-dom';

function CartItem(props) {

    const history = useHistory();

    
    const mappedCart = props.cart.cart.map((item) => {
        const handlePush = () => history.push(`/ProductView/${item.id}`)
        return (
            <div key={item.id} className='cart-items'>
                <div>
                <img
                    id='cart-img'
                    src={item.image}
                    alt={item.title}
                    onClick={handlePush}
                />
                <div onClick={handlePush}>
                    <p>{item.title}</p>
                </div>
                <div>${item.price}</div>
                </div>
                <div>
                    <button onClick={() => alert('Work in progress')}>-</button>
                    <span>Quantity</span>
                    <button onClick={() => alert('Work in progress')}>+</button>
                </div>
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

export default connect(mapStateToProps, { removeFromCart })(CartItem);