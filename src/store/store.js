// import { compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import thunk from "redux-thunk";



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
    // blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);



// const composeEnhancers = compose(applyMiddleware(...middleWares));

//root-reducer



export const store = configureStore({
    reducer: persistedReducer, 
    middleware:middleWares, 
    devTools: process.env.NODE_ENV !== 'production'});

export const persistor = persistStore(store);

