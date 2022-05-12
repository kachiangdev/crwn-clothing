import { CATEGORIES_ACTION_TYPE } from "./categories.type";

const INITIAL_STATE = {
    categories: []
}


export const categoriesReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case CATEGORIES_ACTION_TYPE.SET_CATEGORIES:
            console.log(action);
            return {
                ...state,
                categories:payload
            };
            
        default:
            return state;
    }
}
