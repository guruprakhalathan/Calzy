import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';

const isLocal = () => {
    return window.location.hostname.includes('local');
};

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    // createLogger()
)(createStore);

const createStoreWithMiddlewareProduction = applyMiddleware(
    thunkMiddleware,
)(createStore);

export default function configureStore(initialState) {
    const store = isLocal() ? createStoreWithMiddleware(rootReducer, initialState) :
    createStoreWithMiddlewareProduction(rootReducer, initialState);
    return store;
}
