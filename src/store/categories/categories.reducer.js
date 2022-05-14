import { CATEGORIES_ACTION_TYPE } from "./categories.type";

const INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}


export const categoriesReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type) {
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_START:
            return {
                ...state, 
                isLoading: true
            };
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_SUCCESS:
            return {
                ...state,
                isLoading:false,
                categories:payload
            };
        case CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_FAILED:
            return {
                ...state, 
                isLoading: false, 
                error:payload
            };
        default:
            return state;
    }
}
