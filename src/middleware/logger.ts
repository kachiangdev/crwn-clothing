import { Middleware } from "redux";
import { RootState } from "../store/store";

const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    console.log(action);
    if (!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);

    next(action);

    console.log('next state: ', store.getState());
}