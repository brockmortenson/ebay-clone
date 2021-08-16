import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/contact.css';

function Contact() {
    // REMAINING CHARACTERS
    const [ count, setCount ] = useState(250);

    // POPUP
    const [ success, setSuccess ] = useState(false);
    const [ fail, setFail ] = useState(false);

    // LOADING
    const [ loading, setLoading ] = useState(false);

    function sendEmail(e) {
        e.preventDefault();

        setLoading(true);

        emailjs.sendForm('service_y2vhikq', 'template_6rkendl', e.target, 'user_WhXjNaLuAcUBQlMNFKlOo')
            .then((result) => {
                console.log(result.text);
                setSuccess(true);
                setLoading(false);
                setTimeout(() => {
                    setSuccess(false)
                }, 2000);
            }, (error) => {
                console.log(error.text);
                setFail(true);
                setLoading(false);
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
                <br />
                <h3>Note: All messages are received by Brock Mortenson</h3>
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
                                    required
                                />
                            </div>
                            <div>
                                <label>Email</label>
                                <input
                                    placeholder='Enter your email'
                                    type='email'
                                    name='user_email'
                                    required
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
                                required
                            ></textarea>
                            <p>{count} Characters Remaining</p>
                        </section>
                        <button type='submit'>
                            {
                                loading
                                ?
                                <div className='change-loading'>
                                    <div></div><div></div><div></div><div></div>
                                </div>
                                :
                                'Send'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;