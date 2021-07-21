import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../styles/jewelry.css';

function Jewelry() {
    const [ products, setProducts ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ loadError, setLoadError ] = useState(false);

    const loadingError1 = 'Unable to load window';
    const loadingError2 = 'This may be due to a poor internet connection';

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/category/jewelery`)
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
            <div
                key={product.id}
                className='map-jewelry'
            >
                <img src={product.image} alt='jewelry' />
                <div>
                    <p>{product.title}</p>
                </div>
                <div>${product.price}</div>
            </div>
        );
    })

    return (
        <div className='Jewelry'>
            <p>JEWELRY</p>
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

export default Jewelry;