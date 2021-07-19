import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/landing.css';

const Landing = () => {
    const [ products, setProducts ] = useState([]);
    const [ page, setPage ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(async () => {
        await axios
            .get('https://fakestoreapi.com/products')
            .then(res => {
                console.log(res.data)
                setProducts(res.data)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    const pageOneProducts = products.map((product) => {
        if (product.id <= 10) {
            return (
                <div
                key={product.id}
                className='products'    
                >
                    <div>{product.title}</div>
                    <img src={product.image} />
                    <div>{product.price}</div>
                    {/* <div>{product.description}</div> */}
                </div>
            )
        }
    })

    const pageTwoProducts = products.map((product) => {
        if (product.id > 10) {
            return (
                <div
                    key={product.id}
                    className='products'
                >
                    <div>{product.title}</div>
                    <img src={product.image} />
                    <div>{product.price}</div>
                </div>
            )
        }
    })

    const handleClick = () => {
        setPage(!page)
        window.scroll(0,0)
    }

    return (
        <div className='Landing'>
            Landing page hello
            { !isLoaded ? <div>LOADING...........................</div> : null }
            { !page ?
            <div>
                {pageOneProducts}
                <div>
                    <button onClick={handleClick}>Next Page &#11166;</button>
                </div>
            </div>
            :
            <div>
                {pageTwoProducts}
                <div>
                    <button onClick={handleClick}>&#11164; Previous Page</button>
                </div>
            </div>
            }
        </div>
    );
}

export default Landing;