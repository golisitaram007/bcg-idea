import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import ideaReducer from './reducer';

const middleware = [ thunk ];
const store = createStore(
    ideaReducer,
    compose(
        applyMiddleware(...middleware)
    )
);

export default store;