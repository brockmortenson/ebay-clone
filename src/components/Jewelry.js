import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { addToCart } from '../redux/cartReducer';
import { addToSaved } from '../redux/savedReducer';
import '../styles/jewelry.css';

function Jewelry(props) {
    const [ products, setProducts ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ loadError, setLoadError ] = useState(false);

    // BOOLEAN FOR ADD TO CART/SAVED
    const [ user, setUser ] = useState(false);
    const [ save, setSave ] = useState(false);
    const [ added, setAdded ] = useState(false);
    const [ saved, setSaved ] = useState(false);

    // BOOLEAN FOR ALREADY SAVED/IN CART
    const [ inCart, setInCart ] = useState(false);
    const [ inSaved, setInSaved ] = useState(false);

    const history = useHistory();

    const loadingError1 = 'Unable to load window';
    const loadingError2 = 'This may be due to a poor internet connection';

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/category/jewelery`)
            .then(res => {
                setProducts(res.data);
                setIsLoaded(true);
            })
            .catch(err => {
                console.log(err);
                setLoadError(true);
            })
    }, [])

    const addSuccess = () => {
        setTimeout(() => {
            setAdded(false);
            setSaved(false);
        }, 2000);
    }

    const addFail = () => {
        setTimeout(() => {
            setUser(false);
            setSave(false);
        }, 2000)
    }

    const addedOrSaved = () => {
        setTimeout(() => {
            setInCart(false);
            setInSaved(false);
        }, 2000)
    }

    let loggedIn = props.user.isLoggedIn;

    const mappedProducts = products.map((product) => {
        const handleCart = (e) => {
            e.preventDefault();

            setAdded(false);
    
            if (!props.cart.cart.includes(product)) {
                if (!loggedIn) {
                    setUser(true);
                    addFail();
                } else {
                    setUser(false);
                    props.addToCart(product);
                    setAdded(true);
                    addSuccess();
                }
            } else {
                setInCart(true);
                addedOrSaved();
            }
        }

        const handleSave = (e) => {
            e.preventDefault();

            setSaved(false);

            if (!props.saved.saved.includes(product)) {
                if (!loggedIn) {
                    setSave(true);
                    addFail();
                } else {
                    setSave(false);
                    props.addToSaved(product);
                    setSaved(true);
                    addSuccess();
                }
            } else {
                setInSaved(true);
                addedOrSaved();
            }
        }
        
        return (
            <div
                key={product.id}
                className='jewelry-card'
            >
                <div
                    className='map-jewelry'
                    onClick={() => history.push(`/ProductView/${product.id}`)}
                >
                    <img src={product.image} alt='jewelry' />
                    <div>
                        <p>{product.title}</p>
                    </div>
                    <div>${product.price}</div>
                </div>
                <div>
                    <button onClick={handleSave}>Save Item</button>
                    <button onClick={handleCart}>Add to Cart</button>
                </div>
            </div>
        );
    })

    return (
        <div className='Jewelry'>
            <p>JEWELRY</p>
            {
                loadError
                ?
                <div className='error'>
                    <div onClick={() => setLoadError(false)}>
                        <h1>X</h1>
                    </div>
                    <h2>{loadingError1}</h2>
                    <p>{loadingError2}</p>
                </div>
                :
                null
            }
            { !isLoaded ? <div className='lds-ring'><div></div><div></div><div></div><div></div></div> : null }
            <div className='product-view'>
                {mappedProducts}
                {
                    user
                    ?
                    <div className='failed'>
                        <div>
                            <p>Login to add this item to your cart &#10060;</p>
                        </div>
                    </div>
                    :
                    null
                }
                {
                    save
                    ?
                    <div className='failed'>
                        <div>
                            <p>Login to save this item &#10060;</p>
                        </div>
                    </div>
                    :
                    null
                }
                {
                    inSaved
                    ?
                    <div className='failed'>
                        <div>
                            <p>You already saved this item &#10060;</p>
                        </div>
                    </div>
                    :
                    null
                }
                {
                    inCart
                    ?
                    <div className='failed'>
                        <div>
                            <p>You already added this item to your cart &#10060;</p>
                        </div>
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
    );
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { addToCart, addToSaved })(Jewelry);