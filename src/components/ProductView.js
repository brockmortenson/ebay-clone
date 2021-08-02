import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import store from '../redux/store';
import { addToCart } from '../redux/cartReducer';
import { connect } from 'react-redux';
import '../styles/productView.css';

function ProductView(props) {
    // const [ data, setData ] = useState({ item_id: null })

    const [ isLoaded, setIsLoaded ] = useState(false);

    const history = useHistory();

    const [ user, setUser ] = useState(false);
    const [ item, setItem ] = useState([]);
    
    let id = props.match.params.id

    useEffect(() => {
        axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                setItem(res.data)
                setIsLoaded(true)
            })
    }, [id]);

    let loggedIn = store.getState().user.isLoggedIn;


    let itemData = null;
    const handleClick = async (e) => {
        e.preventDefault(e);
        // let body = { item_id: data.item_id }
        if (!loggedIn) {
            setUser(true)
        } else {
            try {
                const response = await axios
                    // .post('/api/item', body)
                    .get(`https://fakestoreapi.com/products/${id}`)
                    setUser(false)
                    // itemData = response.data
                    // itemData = props;
                    // console.log('Props:', itemData)
                    // console.log(response.data)
                    props.addToCart(response.data)
                    history.push('/Cart')
            } catch (err) {
                console.log(err);
            }
        }
    }

    // add to cart on click redirect to cart - take id received set it to a variable for a specific axios request

    return (
        <div className='ProductView'>
            {
                !isLoaded
                ?
                <div className='load-ring'><div></div><div></div><div></div><div></div></div>
                :
                null
            }
            {
                isLoaded
                ?
                <div className='item'>
                    <img src={item.image} />
                    <div>
                        <div className='title'>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                        <div>Price: ${item.price}</div>
                        <div>
                            <button
                                onClick={handleClick}
                                style={{ textDecoration: 'none' }}
                            >
                                Add to cart
                            </button>
                            {
                                user
                                ?
                                    <div className='log-in'>
                                        <span>
                                            Please
                                            <p onClick={() => history.push('/Login')}>Login</p>
                                            or
                                            <p onClick={() => history.push('/Register')}>Register</p>
                                            in order to add this item to your cart
                                        </span>
                                    </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
}

const mapStateToProps = (state) => { return state }

export default connect(mapStateToProps, { addToCart })(ProductView);