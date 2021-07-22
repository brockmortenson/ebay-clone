import axios from 'axios';
import React, { useState } from 'react';
import '../styles/storeSearch.css';

function StoreSearch() {
    // SearchBar State
    const [ name, setName ] = useState([]);
    const [ selectedFilter, setFilter ] = useState('none');
    const [ searchParams, setSearchParams ] = useState('');
    const [ results, setResults ] = useState(null);

    const handleItemSearch = async () => {
        try {
            await axios
                    .get('https://fakestoreapi.com/products')
                    .then(res => {
                        // res.data
                        console.log(res.data)
                        
                    })
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = () => {

    }
    
    return (
        <div className='StoreSearch'>
            <form onSubmit={handleSubmit}>
                <select
                    name='search-parameter'
                    defaultValue={'none'}
                >
                    <option
                        disabled
                        value='none'
                    >
                        Category
                    </option>
                    <option value='electronics'>Electronics</option>
                    <option value='men'>Men's</option>
                    <option value='women'>Women's</option>
                    <option value='jewelry'>Jewelry</option>
                </select>
                <input
                    placeholder='Search for anything'
                    type='text'
                    onChange={handleItemSearch}
                />
                <button style={{textDecoration: 'none'}} type='submit'>Search</button>
            </form>
        </div>
    );
}

export default StoreSearch;