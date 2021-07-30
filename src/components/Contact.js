import React from 'react';
import '../styles/contact.css';

function Contact() {

    return (
        <div className='Contact'>
            <p>CONTACT</p>
            <div>
                <span>
                    <p>Contact us by phone:</p>
                    <p>(000)-000-0000</p>
                </span>
                <span>
                    <p>Contact us by email:</p>
                    <p>fake-email@fake.com</p>
                </span>
                <form className='contact-form'>
                    <p>Subscribe to receive exclusive offers!</p>
                    <div>
                        <input
                            type='text'
                            placeholder='Enter Your Email'
                            style={{ textDecoration: 'none' }}
                        />
                        <button
                            type='submit'
                            style={{ textDecoration: 'none' }}
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;