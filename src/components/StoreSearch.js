import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Icon, IconButton, TextField } from '@material-ui/core';
import '../styles/storeSearch.css';
import { height } from '@material-ui/system';

function StoreSearch() {
    // SearchBar State
    const [ selectedFilter, setFilter ] = useState('all');
    const [ searchParams, setSearchParams ] = useState('');
    const [ results, setResults ] = useState(null);
    const [ searchFail, setSearchFail ] = useState(false);
    const [ array, setArray ] = useState([]);

    const [ loading, setLoading ] = useState(false);

    const handleItemSearch = async () => {
        setLoading(true)
        try {
            await axios
                    .get('https://fakestoreapi.com/products')
                    .then(res => {
                        const mapped = res.data.map((item) => {
                            setArray([])
                            if (item.title.toLowerCase().includes(searchParams.toLowerCase())) {
                                setSearchFail(false)
                                return (
                                    <Link
                                        key={item.id}
                                        to={`/ProductView/${item.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <div className='item-search' onClick={() => setResults(null)}>
                                            <img src={item.image} alt='products1'/>
                                            <p>{item.title}</p>
                                            <div>${item.price}</div>
                                        </div>
                                    </Link>
                                );
                            } else {
                                array.push(item)
                            }

                            if (array.length >= 20) {
                                setSearchFail(true)
                            }
                        })
                        // console.log(array)
                        setLoading(false)
                        setResults(mapped)
                    })
        } catch (err) {
            console.log(err);
        }
    }

    const handleElecSearch = async () => {
        setLoading(true)
        try {
            await axios
                    .get(`https://fakestoreapi.com/products/category/electronics`)
                    .then(res => {
                        const mapped = res.data.map((item) => {
                            setArray([])
                            if (item.title.toLowerCase().includes(searchParams.toLowerCase())) {
                                setSearchFail(false)
                                return (
                                    <Link
                                        key={item.id}
                                        to={`/ProductView/${item.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <div className='item-search' onClick={() => setResults(null)}>
                                            <img src={item.image} alt='products1' />
                                            <p>{item.title}</p>
                                            <div>${item.price}</div>
                                        </div>
                                    </Link>
                                );
                            } else {
                                array.push(item)
                            }

                            if (array.length >= 6) {
                                setSearchFail(true)
                            }
                        })
                        // console.log(array)
                        setLoading(false)
                        setResults(mapped)
                    })
        } catch (err) {
            console.log(err);
        }
    }

    const handleMenSearch = async () => {
        setLoading(true)
        try {
            await axios
                    .get(`https://fakestoreapi.com/products/category/men's%20clothing`)
                    .then(res => {
                        const mapped = res.data.map((item) => {
                            setArray([])
                            if (item.title.toLowerCase().includes(searchParams.toLowerCase())) {
                                setSearchFail(false)
                                return (
                                    <Link
                                        key={item.id}
                                        to={`/ProductView/${item.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <div className='item-search' onClick={() => setResults(null)}>
                                            <img src={item.image} alt='products1' />
                                            <p>{item.title}</p>
                                            <div>${item.price}</div>
                                        </div>
                                    </Link>
                                );
                            } else {
                                array.push(item)
                            }

                            if (array.length >= 4) {
                                setSearchFail(true)
                            }
                        })
                        setLoading(false)
                        setResults(mapped)
                    })
        } catch (err) {
            console.log(err);
        }
    }

    const handleWomenSearch = async () => {
        setLoading(true)
        try {
            await axios
                    .get(`https://fakestoreapi.com/products/category/women's%20clothing`)
                    .then(res => {
                        const mapped = res.data.map((item) => {
                            setArray([])
                            if (item.title.toLowerCase().includes(searchParams.toLowerCase())) {
                                setSearchFail(false)
                                return (
                                    <Link
                                        key={item.id}
                                        to={`/ProductView/${item.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <div className='item-search' onClick={() => setResults(null)}>
                                            <img src={item.image} alt='products1' />
                                            <p>{item.title}</p>
                                            <div>${item.price}</div>
                                        </div>
                                    </Link>
                                );
                            } else {
                                array.push(item)
                            }

                            if (array.length >= 6) {
                                setSearchFail(true)
                            }
                        })
                        setLoading(false)
                        setResults(mapped)
                    })
        } catch (err) {
            console.log(err);
        }
    }

    const handleJewelrySearch = async () => {
        setLoading(true)
        try {
            await axios
                    .get(`https://fakestoreapi.com/products/category/jewelery`)
                    .then(res => {
                        const mapped = res.data.map((item) => {
                            setArray([])
                            if (item.title.toLowerCase().includes(searchParams.toLowerCase())) {
                                setSearchFail(false)
                                return (
                                    <Link
                                        key={item.id}
                                        to={`/ProductView/${item.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <div className='item-search' onClick={() => setResults(null)}>
                                            <img src={item.image} alt='products1' />
                                            <p>{item.title}</p>
                                            <div>${item.price}</div>
                                        </div>
                                    </Link>
                                );
                            } else {
                                array.push(item)
                            }

                            if (array.length >= 4) {
                                setSearchFail(true)
                            }
                        })
                        setLoading(false)
                        setResults(mapped)
                    })
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchParams === '') {
            setResults(null);
            return results;
        } else if (selectedFilter === 'all') {
            handleItemSearch();
        } else if (selectedFilter === 'men') {
            handleMenSearch();
        } else if (selectedFilter === 'electronics') {
            handleElecSearch();
        } else if (selectedFilter === 'women') {
            handleWomenSearch();
        } else if (selectedFilter === 'jewelry') {
            handleJewelrySearch();
        }
    }

    const edit = () => {
        if (window.innerWidth <= '666px') {
            console.log('nice')
        }
    }
    
    return (
        <div className='StoreSearch'>
            <form onSubmit={handleSubmit}>
                <select
                    name='search-parameter'
                    defaultValue={'all'}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option
                        disabled
                        value='all'
                    >
                        Category
                    </option>
                    <option value='all'>All</option>
                    <option value='electronics'>Electronics</option>
                    <option value='men'>Men's</option>
                    <option value='women'>Women's</option>
                    <option value='jewelry'>Jewelry</option>
                </select>
                <input
                    placeholder='Search for anything'
                    type='text'
                    onChange={(e) => setSearchParams(e.target.value)}
                />
                {/* <TextField
                    className='text-field'
                    type='text'
                    variant='outlined'
                    placeholder='Search for anything'
                    // onChange={(e) => setSearchParams(e.target.value)}
                    onChange={edit}
                    InputProps={{
                        style: {
                            height: '40px',
                            borderRadius: '0',
                            border: '1px solid black'
                        },
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                /> */}
                <button
                    style={{textDecoration: 'none'}}
                    type='submit'
                >
                {
                    loading
                    ?
                    <div className='load-search'><div></div><div></div><div></div><div></div></div>
                    :
                    <h3>Search</h3>
                }
                </button>
            </form>
            {
                !loading && results !== null
                ?
                <div className='results' onMouseLeave={() => setResults(null)}>
                    {
                        searchFail
                        ?
                        <div>No results were found that match your search &#9785;</div>
                        :
                        <div>{results}</div>
                    }
                </div>
                :
                null
            }
        </div>
    );
}

export default StoreSearch;