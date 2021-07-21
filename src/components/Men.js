import axios from 'axios';
import React, { useState, useEffect} from 'react';
import '../styles/men.css';

function Men() {
    const [ products, setProducts ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/category/men's%20clothing`)
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
                className='map-mens'
            >
                <img src={product.image} alt='mens' />
                <div>
                    <p>{product.title}</p>
                </div>
                <div>${product.price}</div>
            </div>
        );
    })

    return (
        <div className='Men'>
            <p>MEN'S APPAREL</p>
            { !isLoaded ? <div className='lds-ring'><div></div><div></div><div></div><div></div></div> : null }
            <div className='product-view'>
                {mappedProducts}
            </div>
        </div>
    );
}

export default Men;