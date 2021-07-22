import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/men.css';

function Men() {
    const [ products, setProducts ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ loadError, setLoadError ] = useState(false);

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

    const mappedProducts = products.map((product) => {
        return (
            <Link
                key={product.id}
                to={`/ProductView/${product.id}`}
                style={{ textDecoration: 'none' }}
            >
                <div className='map-mens'>
                    <img src={product.image} alt='mens' />
                    <div>
                        <p>{product.title}</p>
                    </div>
                    <div>${product.price}</div>
                </div>
            </Link>
        );
    })

    return (
        <div className='Men'>
            <p>MEN'S APPAREL</p>
            { loadError ?
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
            </div>
        </div>
    );
}

export default Men;