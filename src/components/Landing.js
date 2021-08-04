import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToCart } from '../redux/cartReducer';
import { addToSaved } from '../redux/savedReducer';
import '../styles/landing.css';

const Landing = (props) => {
    const [ products, setProducts ] = useState([]);
    const [ page, setPage ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ loadError, setLoadError ] = useState(false);

    const [ user, setUser ] = useState(false);

    const loadingError1 = 'Unable to load window';
    const loadingError2 = 'This may be due to a poor internet connection';

    const history = useHistory();

    useEffect(() => {
        axios
            .get('https://fakestoreapi.com/products')
            .then(res => {
                // console.log(res.data)
                setProducts(res.data)
                setIsLoaded(true)
            })
            .catch(err => {
                console.log(err)
                setLoadError(true)
            })
            // console.log(props)
    }, [])

    let loggedIn = props.user.isLoggedIn;

    const pageOneProducts = products.map((product) => {
        const handleCart = (e) => {
            e.preventDefault();
    
            if (!loggedIn) {
                setUser(true)
            } else {
                setUser(false)
                props.addToCart(product)
            }
        }
        
        if (product.id <= 10) {
            return (
                <div
                    key={product.id}
                    className='card'
                >
                    <div
                        className='products'
                        onClick={() => history.push(`/ProductView/${product.id}`)}
                    >
                        <img src={product.image} alt='products1' />
                        <div>
                            <p>{product.title}</p>
                        </div>
                        <div>${product.price}</div>
                    </div>
                    <div>
                        <button>Save Item</button>
                        <button onClick={handleCart}>Add to Cart</button>
                    </div>
                </div>
            );
        }
    })

    const pageTwoProducts = products.map((product) => {
        const handleCart = (e) => {
            e.preventDefault();
    
            if (!loggedIn) {
                setUser(true)
            } else {
                setUser(false)
                props.addToCart(product)
            }
        }
        
        if (product.id > 10) {
            return (
                <div
                    key={product.id}
                    className='card'
                >
                    <div
                        className='products'
                        onClick={() => history.push(`/ProductView/${product.id}`)}
                    >
                        <img src={product.image} alt='products2' />
                        <div>
                            <p>{product.title}</p>
                        </div>
                        <div>${product.price}</div>
                    </div>
                    <div>
                        <button>Save Item</button>
                        <button onClick={handleCart}>Add to Cart</button>
                    </div>
                </div>
            );
        }
    })

    const handleClick = () => {
        setPage(!page)
        window.scroll(0,0)
    }

    // Loading Animation From 'loading.io'

    return (
        <div className='Landing'>
            <p>HOME</p>
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
            {
                !page
                ?
                <div className='product-view'>
                    {pageOneProducts}
                    {
                        isLoaded
                        ?
                        <div className='btn'>
                            <button onClick={handleClick}>Next Page &#11166;</button>
                        </div>
                        :
                        null
                    }
                    {
                        user
                        ?
                        <div id='login-add'>
                            <div>
                                <div>
                                    <span onClick={() => setUser(false)}>X</span>
                                </div>
                                <div>
                                    <p onClick={() => history.push('/Login')}>Login</p>
                                    <p>to be able to add this item to your cart</p>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                :
                <div className='product-view'>
                    {pageTwoProducts}
                    {
                        isLoaded
                        ?
                        <div className='btn'>
                            <button onClick={handleClick} style={{ textDecoration: 'none' }}>&#11164; Previous Page</button>
                        </div>
                        :
                        null
                    }
                    {
                        user
                        ?
                        <div id='login-add'>
                            <div>
                                <div>
                                    <span onClick={() => setUser(false)}>X</span>
                                </div>
                                <div>
                                    <p onClick={() => history.push('/Login')}>Login</p>
                                    <p>to be able to add this item to your cart</p>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { addToCart, addToSaved })(Landing);