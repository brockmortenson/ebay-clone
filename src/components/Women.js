import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../styles/women.css';

function Women() {
    const [ products, setProducts ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/category/women's%20clothing`)
            .then(res => {
                // console.log(res.data)
                setProducts(res.data)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    const mappedProducts = products.map((product) => {
        return (
            <div
                key={product.id}
                className='map-womens'
            >
                <img src={product.image} alt='womens' />
                <div>
                    <p>{product.title}</p>
                </div>
                <div>${product.price}</div>
            </div>
        );
    })

    return (
        <div className='Women'>
            <p>WOMEN'S APPAREL</p>
            { !isLoaded ? <div className='lds-ring'><div></div><div></div><div></div><div></div></div> : null }
            <div className='product-view'>
                {mappedProducts}
            </div>
        </div>
    );
}

export default Women;