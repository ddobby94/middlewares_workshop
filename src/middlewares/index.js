export const basicLogger = (store) => (next) => (action) => {
    console.log('Next action to be dispatched: ', action);
    next(action);
    console.log('The store next state: ', store.getState());
}

export const errorHandler = (store) => (next) => (action) => {
    try {
        next(action);
    } catch (e) {
        console.log('ERROR WAS CAUGHT: ', e);
    }
}

const createThunkMiddleware = (extraArgument) => (store) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState, extraArgument);
    }

    return next(action);
};
