import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import tasks from './reducers';
import App from './components/App';

import { errorHandler, basicLogger } from './middlewares'
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    tasks,
    {   
        todos: [],
        fetchingData: {
            fetching: false,
            error: null,
        },
    },
    applyMiddleware(basicLogger, errorHandler, ReduxThunk, sagaMiddleware)
);

sagaMiddleware.run(mySaga);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);