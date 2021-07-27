import React from 'react';
import '../styles/footer.css';

function Footer() {

    return (
        <div className='Footer'>
            <div>
                <section>
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
                </section>
                <div>&#8594;</div>
                <article>
                    SGGE is an ecommerce web application developed by Brock Mortenson. The products shown within the site are being brought from
                    <a
                        href='https://fakestoreapi.com/'
                        target='_blank'
                        rel='noreferrer'
                        style={{ textDecoration: 'none' }}
                    >
                        {' '} Fake Store API. {' '}
                    </a>
                        Some of the designs for this website were inspired by eBay such as the colors of "SGGE" and the navigation found in the header. Check out the
                    <a
                        href='https://github.com/brockmortenson/ebay-clone'
                        target='_blank'
                        rel='norefferer'
                        style={{ textDecoration: 'none' }}
                    >
                        {' '} source code {' '}
                    </a>
                        on GitHub
                </article>
            </div>
        </div>
    );
}

export default Footer;