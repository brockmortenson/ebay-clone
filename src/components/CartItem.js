import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeFromCart, adjustQuantity, addToCart } from '../redux/cartReducer';
import cartImg from '../images/cart.png';
import '../styles/cartItem.css';
import { useHistory } from 'react-router-dom';

function CartItem(props) {
    const [ itemCount, setItemCount ] = useState(0);

    const history = useHistory();

    
    
    const mappedCart = props.cart.cart.map((item, index) => {
        const handlePush = () => history.push(`/ProductView/${item.id}`)
        const increment = () => {
            props.addToCart(item);
            // props.adjustQuantity()

            console.log(itemCount)

            // for (let i = 0; i <= props.cart.cart.length; i++) {
            //     for (let j = i + 1; j <= props.cart.cart.length; j++) {
            //         if (props.cart.cart[i] === props.cart.cart[j]) {
            //             props.cart.cart.splice(props.cart.cart[i], 1)
            //         }
            //     }
            // }
        }
        return (
            <div key={index} className='cart-items'>
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
                    <button onClick={() => alert('Work in progress')}><p>-</p></button>
                    <span>{itemCount}</span>
                    <button onClick={increment}><p>+</p></button>
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

                {/* <img src={props.itemData.image} style={{ width: '50px', height: '50px'}} />
                <div>
                    <p>{props.itemData.title}</p>
                    <p>{props.itemData.description}</p>
                </div> */}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, { removeFromCart, adjustQuantity, addToCart })(CartItem);