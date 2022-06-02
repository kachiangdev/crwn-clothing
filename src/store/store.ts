import { Middleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
// import thunk from "redux-thunk";
import { rootSaga } from "./root-saga";
import createSagaMiddleware from "redux-saga";


export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
    // blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const sagaMiddleware = createSagaMiddleware();

const middleWares = [process.env.NODE_ENV !== 'production' && logger, 
sagaMiddleware,
//thunk
].filter((middleware): middleware is Middleware => Boolean(middleware));

//root-reducer



export const store = configureStore({
    reducer: persistedReducer, 
    middleware:middleWares, 
    devTools: process.env.NODE_ENV !== 'production'});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

