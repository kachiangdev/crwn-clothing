import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils";

import { fetchCategoriesSuccess, fetchCategoriesFailed  } from "./categories.action";

import { CATEGORIES_ACTION_TYPE } from "./categories.type";



export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCollectionAndDocuments);
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync )
}


export function* categoriesSagas() {
    yield all([call(onFetchCategories)])
}