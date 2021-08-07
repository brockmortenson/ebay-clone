import React from 'react';
import emailjs from 'emailjs-com';
import '../styles/contact.css';

function Contact() {

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_y2vhikq', 'template_xbx4qfa', e.target, 'user_WhXjNaLuAcUBQlMNFKlOo')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset();
    }

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
                <form className='contact-form' onSubmit={sendEmail}>
                    <p>Subscribe to receive exclusive offers!</p>
                    <div>
                        <input
                            type='text'
                            placeholder='Enter Your Email'
                            style={{ textDecoration: 'none' }}
                            name='email'
                            onClick={() => alert('Work in progress')}
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