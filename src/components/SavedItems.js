import React from 'react';
import SavedItem from './SavedItem';
import { connect } from 'react-redux';
import { emptySaved } from '../redux/savedReducer';
import '../styles/savedItems.css';

function SavedItems(props) {

    let count = props.saved.savedCount;

    return (
        <div className='SavedItems'>
            <p>MY SAVED ITEMS</p>
            <button onClick={() => props.emptySaved()}>Clear saved items</button>
            <h2>Total saved items: {count}</h2>
            <div className='saved-view'>
                <SavedItem />
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, { emptySaved })(SavedItems);