import React from 'react';
import Title from './Title';
import AddTask from './AddTask';
import Board from './Board';
import { connect } from 'react-redux';
import './App.css';

import { loadMore, errorTask } from '../actions';
import { isLoadmoreFetching, loadMoreErrorMessage } from '../selectors';
import { LoadMoreButton, ErrorButton, LoadingOverlay, ErrorMessage } from './HelperComponents';

const App = ({ loadMore, errorTask, isFetching, errorMessage }) => (
    <div>
        <Title />
        <LoadMoreButton onClick={loadMore} />
        <ErrorButton onClick={errorTask} />
        <AddTask />
        {
            errorMessage &&  <ErrorMessage error={errorMessage} />
        }
        {
            isFetching && <LoadingOverlay />
        }
        {
            !(errorMessage || isFetching) && <Board/>
        }
    </div>
);

const mapStateToProps = (state) => ({
    isFetching: isLoadmoreFetching(state),
    errorMessage: loadMoreErrorMessage(state),
})

export default connect(mapStateToProps, { loadMore, errorTask })(App);