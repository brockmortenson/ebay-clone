import React from 'react';
import { connect } from 'react-redux';
import { removeFromSaved } from '../redux/savedReducer';
import { useHistory } from 'react-router-dom';
import '../styles/savedItem.css';

function SavedItem(props) {
    console.log(props)

    const history = useHistory();

    const mapSaved = props.saved.saved.map((item) => {
        return (
            <div
                key={item.id}
                className='saved-items'
            >
                <div onClick={() => history.push(`/ProductView/${item.id}`)}>
                    <img src={item.image} alt={item.title} />
                    <div>
                        <p>{item.title}</p>
                    </div>
                    <div>${item.price}</div>
                </div>
                <div className='remove-saved'>
                    <button onClick={() => props.removeFromSaved(item)}>Remove</button>
                </div>
            </div>
        );
    })

    return (
        <div className='SavedItem'>
            <div>
                {
                    mapSaved.length !== 0
                    ?
                    mapSaved
                    :
                    <div>
                        <h2>You currently have no saved items</h2>
                        <p>Once you have saved items, you will see be able to see them here.</p>
                    </div>
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, { removeFromSaved })(SavedItem);