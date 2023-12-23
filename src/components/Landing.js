import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

    // BOOLEAN FOR ADD TO CART/SAVED
    const [ user, setUser ] = useState(false);
    const [ save, setSave ] = useState(false);
    const [ added, setAdded ] = useState(false);
    const [ saved, setSaved ] = useState(false);

    // BOOLEAN FOR ALREADY SAVED/IN CART
    const [ inCart, setInCart ] = useState(false);
    const [ inSaved, setInSaved ] = useState(false);
    
    const loadingError1 = 'Unable to load window';
    const loadingError2 = 'This may be due to a poor internet connection';

    const history = useHistory();

    useEffect(() => {
        axios
            .get('https://fakestoreapi.com/products')
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

    const pageOneProducts = products.map((product) => {
        const handleCart = (e) => {
            e.preventDefault();

            setAdded(false);
            
            if (!props.cart.cart.includes(product)) {
                // if (!loggedIn) {
                //     setUser(true);
                //     addFail();
                // } else {
                    setUser(false);
                    props.addToCart(product);
                    setAdded(true);
                    addSuccess();
                // }
            } else {
                setInCart(true);
                addedOrSaved();
            }
        }

        const handleSave = (e) => {
            e.preventDefault();

            setSaved(false);

            if (!props.saved.saved.includes(product)) {
                // if (!loggedIn) {
                //     setSave(true);
                //     addFail();
                // } else {
                    setSave(false);
                    props.addToSaved(product);
                    setSaved(true);
                    addSuccess();
                // }
            } else {
                setInSaved(true);
                addedOrSaved();
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
                        <button onClick={handleSave}>Save Item</button>
                        <button onClick={handleCart}>Add to Cart</button>
                    </div>
                </div>
            );
        }
    })

    const pageTwoProducts = products.map((product) => {
        const handleCart = (e) => {
            e.preventDefault();

            setAdded(false);
    
            if (!props.cart.cart.includes(product)) {
                // if (!loggedIn) {
                //     setUser(true);
                //     addFail();
                // } else {
                    setUser(false);
                    props.addToCart(product);
                    setAdded(true);
                    addSuccess();
                // }
            } else {
                setInCart(true);
                addedOrSaved();
            }
        }

        const handleSave = (e) => {
            e.preventDefault();

            setSaved(false);

            if (!props.saved.saved.includes(product)) {
                // if (!loggedIn) {
                //     setSave(true);
                //     addFail();
                // } else {
                    setSave(false);
                    props.addToSaved(product);
                    setSaved(true);
                    addSuccess();
                // }
            } else {
                setInSaved(true);
                addedOrSaved();
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
                        <button onClick={handleSave}>Save Item</button>
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
                            <button onClick={handleClick}>
                                <p>Next Page<i className='arrow1' style={{ marginLeft: '10px' }}></i></p>
                            </button>
                        </div>
                        :
                        null
                    }
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
                :
                <div className='product-view'>
                    {pageTwoProducts}
                    {
                        isLoaded
                        ?
                        <div className='btn'>
                            <button onClick={handleClick} style={{ textDecoration: 'none' }}>
                                <p><i className='arrow' style={{ marginRight: '10px' }}></i>Previous Page</p>
                            </button>
                        </div>
                        :
                        null
                    }
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
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { addToCart, addToSaved })(Landing);