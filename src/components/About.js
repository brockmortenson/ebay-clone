import React from 'react';
import '../styles/about.css';

function About() {

    return (
        <div className='About'>
            <p>ABOUT</p>
            <div>
                <section>
                    <div>
                        SGGE is a web application developed by Brock Mortenson. There is no actual use for this website as it is only for show. The products show throughout the website are being brought from the
                        <a
                            href='https://fakestoreapi.com/'
                            rel='noreferrer'
                            target='_blank'
                            style={{ textDecoration: 'none' }}
                        >
                            {' '} Fake Store API. {' '}
                        </a>
                    </div>
                    <div>
                        Some designs used to create this website were inspired by eBay such as the colors in the title and the layered nav bars within the header. The rest of the designs seen are original and were created as the application was developed. I hope you find this website and/or the
                        <a
                            href='https://github.com/brockmortenson/ebay-clone'
                            rel='norefferer'
                            target='_blank'
                            style={{ textDecoration: 'none' }}
                        >
                            {' '} source code {' '}
                        </a>
                        helpful.
                    </div>
                </section>
                <div>
                    <img src='https://thumbs.dreamstime.com/x/color-image-blue-green-red-yellow-sport-ball-9034986.jpg' alt='colors' />
                </div>
                <article>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet consectetur adipiscing elit duis tristique sollicitudin nibh. Metus dictum at tempor commodo ullamcorper. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Gravida quis blandit turpis cursus in hac habitasse platea. Duis convallis convallis tellus id interdum velit laoreet. Posuere lorem ipsum dolor sit amet. Purus gravida quis blandit turpis cursus. Tellus in metus vulputate eu scelerisque felis imperdiet. Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Sit amet nisl purus in mollis. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed.</p>

                    <p>Vestibulum sed arcu non odio euismod lacinia at quis risus. Dignissim sodales ut eu sem integer vitae justo eget magna. Scelerisque in dictum non consectetur a. Fermentum dui faucibus in ornare. Phasellus faucibus scelerisque eleifend donec. Viverra nam libero justo laoreet sit amet cursus sit. Sit amet nulla facilisi morbi tempus iaculis. Vestibulum lorem sed risus ultricies tristique. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Non enim praesent elementum facilisis leo vel. Et malesuada fames ac turpis egestas maecenas pharetra convallis. Sit amet consectetur adipiscing elit ut aliquam purus. Velit dignissim sodales ut eu sem integer vitae justo eget.</p>
                </article>
            </div>
        </div>
    );
}

export default About;