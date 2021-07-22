import React from 'react';
import StoreSearch from './StoreSearch';
import '../styles/navTwo.css';

function NavTwo() {

    return (
        <div className='NavTwo'>
            <div>
                <span>
                    <p>S</p>
                </span>
                <span>
                    <p>G</p>
                </span>
                <span>
                    <p>G</p>
                </span>
                <span>
                    <p>E</p>
                </span>
            </div>
            <section>
                <StoreSearch />
            </section>
        </div>
    );
}

export default NavTwo;