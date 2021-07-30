import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/landing.css';

const Landing = (props) => {
    const [ products, setProducts ] = useState([]);
    const [ page, setPage ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ loadError, setLoadError ] = useState(false);

    const loadingError1 = 'Unable to load window';
    const loadingError2 = 'This may be due to a poor internet connection';

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

    const pageOneProducts = products.map((product) => {
        if (product.id <= 10) {
            return (
                <Link
                    key={product.id}
                    to={`/ProductView/${product.id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <div className='products'>
                        <img src={product.image} alt='products1' />
                        <div>
                            <p>{product.title}</p>
                        </div>
                        <div>${product.price}</div>
                    </div>
                </Link>
            );
        }
    })

    const pageTwoProducts = products.map((product) => {
        if (product.id > 10) {
            return (
                <Link
                    key={product.id}
                    to={`/ProductView/${product.id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <div className='products'>
                        <img src={product.image} alt='products2' />
                        <div>
                            <p>{product.title}</p>
                        </div>
                        <div>${product.price}</div>
                    </div>
                </Link>
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
                </div>
            }
        </div>
    );
}

export default Landing;