import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { addToCart } from '../redux/cartReducer';
import { addToSaved } from '../redux/savedReducer';
import '../styles/men.css';

function Men(props) {
    const [ products, setProducts ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ loadError, setLoadError ] = useState(false);

    // BOOLEAN FOR ADD TO CART/SAVED
    const [ user, setUser ] = useState(false);
    const [ save, setSave ] = useState(false);
    const [ added, setAdded ] = useState(false);
    const [ saved, setSaved ] = useState(false);

    const history = useHistory();

    const loadingError1 = 'Unable to load window';
    const loadingError2 = 'This may be due to a poor internet connection';

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/category/men's%20clothing`)
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

    const addSuccess = () => {
        setTimeout(() => {
            setAdded(false)
            setSaved(false)
        }, 2000);
    }

    const addFail = () => {
        setTimeout(() => {
            setUser(false)
            setSave(false)
        }, 2000)
    }

    let loggedIn = props.user.isLoggedIn;
    
    const mappedProducts = products.map((product) => {
        const handleCart = (e) => {
            e.preventDefault();

            setAdded(false)
    
            if (!loggedIn) {
                setUser(true)
                addFail();
            } else {
                setUser(false)
                props.addToCart(product)
                setAdded(true)
                addSuccess();
            }
        }

        const handleSave = (e) => {
            e.preventDefault();

            setSaved(false)

            if (!loggedIn) {
                setSave(true)
                addFail();
            } else {
                setSave(false)
                props.addToSaved(product)
                setSaved(true)
                addSuccess();
            }
        }
        
        return (
            <div
                key={product.id}
                className='men-card'
            >
                <div
                    className='map-mens'
                    onClick={() => history.push(`/ProductView/${product.id}`)}
                >
                    <img src={product.image} alt='mens' />
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
        <div className='Men'>
            <p>MEN'S APPAREL</p>
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

export default connect(mapStateToProps, { addToCart, addToSaved })(Men);