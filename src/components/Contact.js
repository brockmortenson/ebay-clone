import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/contact.css';

function Contact() {
    const [ count, setCount ] = useState(250);

    const [ success, setSuccess ] = useState(false);
    const [ fail, setFail ] = useState(false);

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_y2vhikq', 'template_6rkendl', e.target, 'user_WhXjNaLuAcUBQlMNFKlOo')
            .then((result) => {
                console.log(result.text);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false)
                }, 2000);
            }, (error) => {
                console.log(error.text);
                setFail(true);
                setTimeout(() => {
                    setFail(false)
                }, 2000);
            });
        e.target.reset();
    }

    return (
        <div className='Contact'>
            <p>CONTACT</p>
            <div>
                {
                    fail
                    ?
                    <div className='failed'>
                        <div>
                            <p>An error ocurred. Try again later. &#10060;</p>
                        </div>
                    </div>
                    :
                    null
                }
                {
                    success
                    ?
                    <div className='added'>
                        <div>
                            <p>Message sent successfully! &#9989;</p>
                        </div>
                    </div>
                    :
                    null
                }
                <span>
                    <p>Contact us by phone:</p>
                    <p>(000)-000-0000</p>
                </span>
                <span>
                    <p>Or send us a message below</p>
                </span>
                <form className='contact-form' onSubmit={sendEmail}>
                    <div>
                        <h2>Get In Touch</h2>
                        <div>
                            <div>
                                <label htmlFor='fname'>Name</label>
                                <input
                                    placeholder='Enter your name'
                                    type='text'
                                    name='user_name'
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input
                                    placeholder='Enter your email'
                                    type='email'
                                    name='user_email'
                                />
                            </div>
                        </div>
                        <section>
                            <label>Message</label>
                            <textarea
                                placeholder='Type your message...'
                                name='message'
                                onChange={(e) => setCount(250 - e.target.value.length)}
                                maxLength='250'
                            ></textarea>
                            <p>{count} Characters Remaining</p>
                        </section>
                        <button type='submit'>Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;