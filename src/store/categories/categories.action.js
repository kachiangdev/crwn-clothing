import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils"; 
import { createAction } from "../../utils/reducer/reducer.utils";

import { CATEGORIES_ACTION_TYPE } from "./categories.type";

export const setCategories = (categoriesArray) => 
    createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray);

export const fetchCategoiresStart = () =>
    createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_START,);

export const fetchCategoiresSuccess = (categoriesArray) =>
    createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_SUCCESS, categoriesArray);


export const fetchCategoiresFailed = (error) =>
    createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_FAILED, error);

export const fetchCategoriesAsync = () => async(dispatch) => {
    dispatch(fetchCategoiresStart())
    try {
        console.log("in featchCategoriesAsync")
        const categoriesArray = await getCollectionAndDocuments();
        dispatch(fetchCategoiresSuccess(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoiresFailed(error));
    }

} 

