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