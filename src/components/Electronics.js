import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCart } from '../redux/cartReducer';
import { addToSaved } from '../redux/savedReducer';
import '../styles/electronics.css';

function Electronics(props) {
    const [ products, setProducts ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ loadError, setLoadError ] = useState(false);

    const [ user, setUser ] = useState(false);

    const history = useHistory();

    const loadingError1 = 'Unable to load window';
    const loadingError2 = 'This may be due to a poor internet connection';

    useEffect(() => {
        axios
            .get('https://fakestoreapi.com/products/category/electronics')
            .then(res => {
                // console.log(res.data)
                setProducts(res.data)
                setIsLoaded(true)
            })
            .catch(err => {
                console.log(err)
                setLoadError(true)
            })
    }, [])

    let loggedIn = props.user.isLoggedIn;

    const mappedProducts = products.map((product) => {
        const handleCart = (e) => {
            e.preventDefault();
    
            if (!loggedIn) {
                setUser(true)
            } else {
                setUser(false)
                props.addToCart(product)
            }
        }
        
        return (
            <div
                key={product.id}
                className='elec-card'
            >
                <div
                    className='map-electronics'
                    onClick={() => history.push(`/ProductView/${product.id}`)}
                >
                    <img src={product.image} alt='electronics' />
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
    })

    return (
        <div className='Electronics'>
            <p>ELECTRONICS</p>
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
        </div>
    );
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, { addToCart, addToSaved })(Electronics);