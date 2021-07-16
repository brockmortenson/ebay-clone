import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className='Landing'>
            Landing page hello
            <Link to='/Login'><p>Login</p></Link>
        </div>
    );
}

export default Landing;