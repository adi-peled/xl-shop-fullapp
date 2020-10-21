import { ItemReducer } from './reducers/ItemReducer'
import { UserReducer } from './reducers/UserReducer'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'
// Only if you have a number of reducers:
const rootReducer = combineReducers({
    itemReducer: ItemReducer,
    userReducer: UserReducer
})
// This is only for the redux dev tools:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))