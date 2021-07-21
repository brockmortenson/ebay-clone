import React from 'react';
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
                <select>
                    <option selected disabled>Category</option>
                    <option>Electronics</option>
                    <option>Men's</option>
                    <option>Women's</option>
                    <option>Jewelry</option>
                </select>
                <input
                    placeholder='Search for anything'
                />
                <button>Search Button</button>
            </section>
        </div>
    );
}

export default NavTwo;