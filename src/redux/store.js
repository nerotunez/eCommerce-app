import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import bagReducer from './bag-reducer';
import categoryReducer from './category-reducer';
import currencyReducer from './currency-reducer';
import productReducer from './product-reducer';

let reducers = combineReducers({
    categoryReducer: categoryReducer,
    currencyReducer: currencyReducer,
    bagReducer: bagReducer,
    productReducer: productReducer,
})

let store = createStore(reducers, applyMiddleware(thunk))

export default store;