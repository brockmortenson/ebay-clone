import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addToCart } from '../redux/cartReducer';
import { addToSaved } from '../redux/savedReducer';
import { connect } from 'react-redux';
import '../styles/productView.css';


function ProductView(props) {

    const [ isLoaded, setIsLoaded ] = useState(false);

    const history = useHistory();

    const [ user, setUser ] = useState(false);
    const [ item, setItem ] = useState([]);

    // BOOLEAN FOR ADD TO CART/SAVED
    const [ save, setSave ] = useState(false);
    const [ added, setAdded ] = useState(false);
    const [ saved, setSaved ] = useState(false);
    
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

        setSave(false)

        setAdded(false)
        
        if (!loggedIn) {
            setUser(true)
        } else {
            setUser(false)
            props.addToCart(item)
            setAdded(true)
            addSuccess();
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
        
        setUser(false)

        setSaved(false)
        
        if (!loggedIn) {
            setSave(true)
        } else {
            setSave(false)
            props.addToSaved(item)
            setSaved(true)
            addSuccess();
        }
    }

    const addSuccess = () => {
        setTimeout(() => {
            setAdded(false)
            setSaved(false)
        }, 2000);
    }

    return (
        <div className='ProductView'>
            <section>
                <p onClick={() => history.goBack()}>&#8678;</p>
            </section>
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
                            <section className='buttons'>
                                <button
                                    onClick={handleSave}
                                    style={{ textDecoration: 'none' }}
                                >
                                    Save item
                                </button>
                                <button
                                    onClick={handleCart}
                                    style={{ textDecoration: 'none' }}
                                >
                                    Add to cart
                                </button>
                            </section>
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
                            {
                                save
                                ?
                                <div className='log-in'>
                                    <span>
                                        <p onClick={() => history.push('/Login')}>Login</p>
                                        to be able to save this item
                                    </span>
                                </div>
                                :
                                null
                            }
                            {
                                added
                                ?
                                <div className='added'>
                                    <div>
                                        <p>Item was added to your cart! &#9989;</p>
                                    </div>
                                </div>
                                :
                                null
                            }
                            {
                                saved
                                ?
                                <div className='added'>
                                    <div>
                                        <p>Saved! &#9989;</p>
                                    </div>
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

export default connect(mapStateToProps, { addToCart, addToSaved })(ProductView);