// import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils"; 
import { createAction } from "../../utils/reducer/reducer.utils";

import { CATEGORIES_ACTION_TYPE } from "./categories.type";

export const setCategories = (categoriesArray) => 
    createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray);

export const fetchCategoriesStart = () =>
    createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,);

export const fetchCategoriesSuccess = (categoriesArray) =>
    createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categoriesArray);


export const fetchCategoriesFailed = (error) =>
    createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error);

// export const fetchCategoriesAsync = () => async(dispatch) => {
//     dispatch(fetchCategoriesStart())
//     try {
//         const categoriesArray = await getCollectionAndDocuments();
//         dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//         dispatch(fetchCategoriesFailed(error));
//     }

// } 

