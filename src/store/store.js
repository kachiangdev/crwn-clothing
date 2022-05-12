// import { compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
    console.log(action);
    if (!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.playload);
    console.log('currentState: 0', store.getState());

    next(action);

    console.log('next state: ', store.getState());
}

const middleWares = [loggerMiddleware];



// const composeEnhancers = compose(applyMiddleware(...middleWares));

//root-reducer



export const store = configureStore({reducer: rootReducer, middleware:middleWares});

