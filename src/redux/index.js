import { configureStore, createReducer } from '@reduxjs/toolkit';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cartReducer } from './Reducers/cartReducer';
import { userReducer } from './Reducers/userReducer';
import { wishlistReducer } from './Reducers/wishlistReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};


const reducer = combineReducers({
    wishlistReducer,
    cartReducer,
    userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {
    store,
    persistor
};
