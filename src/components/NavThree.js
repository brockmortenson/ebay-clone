import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navThree.css';

function NavThree() {
    const [ name1, setName1 ] = useState('unselected');
    const [ name2, setName2 ] = useState('unselected');
    const [ name3, setName3 ] = useState('unselected');
    const [ name4, setName4 ] = useState('unselected');
    const [ name5, setName5 ] = useState('unselected');

    const handleHome = () => {
        setName1('selected-nav')
        setName2('unselected')
        setName3('unselected')
        setName4('unselected')
        setName5('unselected')
        console.log(name1)
    }
    const handleElec = () => {
        setName2('selected-nav')
        setName1('unselected')
        setName3('unselected')
        setName4('unselected')
        setName5('unselected')
        console.log(name2)
    }
    const handleMen = () => {
        setName3('selected-nav')
        setName1('unselected')
        setName2('unselected')
        setName4('unselected')
        setName5('unselected')
        console.log(name3)
    }
    const handleWomen = () => {
        setName4('selected-nav')
        setName1('unselected')
        setName2('unselected')
        setName3('unselected')
        setName5('unselected')
        console.log(name4)
    }
    const handleJewelry = () => {
        setName5('selected-nav')
        setName1('unselected')
        setName2('unselected')
        setName3('unselected')
        setName4('unselected')
        console.log(name5)
    }

    return (
        <div className='NavThree'>
            <Link
                to='/'
                onClick={handleHome}
                name='home'
                className={name1}
                style={{ textDecoration: 'none' }}
            >
                Home
            </Link>
            <Link
                to='/Electronics'
                onClick={handleElec}
                name='elec'
                className={name2}
                style={{ textDecoration: 'none' }}
            >
                Electronics
            </Link>
            <Link
                to='/Men'
                onClick={handleMen}
                name='men'
                className={name3}
                style={{ textDecoration: 'none' }}
            >
                Men's Apparel
            </Link>
            <Link
                to='/Women'
                onClick={handleWomen}
                name='women'
                className={name4}
                style={{ textDecoration: 'none' }}
            >
                Women's Apparel
            </Link>
            <Link
                to='/Jewelry'
                onClick={handleJewelry}
                style={{ textDecoration: 'none' }}
                name='jewelry'
                className={name5}
                style={{ textDecoration: 'none' }}
            >
                Jewelry
            </Link>
        </div>
    );
}

export default NavThree;