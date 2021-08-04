import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addToCart } from '../redux/cartReducer';
import { connect } from 'react-redux';
import '../styles/productView.css';


function ProductView(props) {

    const [ isLoaded, setIsLoaded ] = useState(false);

    const history = useHistory();

    const [ user, setUser ] = useState(false);
    const [ item, setItem ] = useState([]);
    
    let id = props.match.params.id

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                setItem(res.data)
                setIsLoaded(true)
            })
    }, [id]);

    let loggedIn = props.user.isLoggedIn;

    const handleCart = (e) => {
        e.preventDefault();

        if (!loggedIn) {
            setUser(true)
        } else {
            setUser(false)
            props.addToCart(item)
        }
    }

    return (
        <div className='ProductView'>
            {
                !isLoaded
                ?
                <div className='load-ring'><div></div><div></div><div></div><div></div></div>
                :
                null
            }
            {
                isLoaded
                ?
                <div className='item'>
                    <img src={item.image} alt={item.title} />
                    <div>
                        <div className='title'>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                        <div>Price: ${item.price}</div>
                        <div>
                            <button
                                onClick={handleCart}
                                style={{ textDecoration: 'none' }}
                            >
                                Add to cart
                            </button>
                            {
                                user
                                ?
                                    <div className='log-in'>
                                        <span>
                                            Please
                                            <p onClick={() => history.push('/Login')}>Login</p>
                                            or
                                            <p onClick={() => history.push('/Register')}>Register</p>
                                            in order to add this item to your cart
                                        </span>
                                    </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { addToCart })(ProductView);