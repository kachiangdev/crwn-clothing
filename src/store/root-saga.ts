// import { all, call } from 'redux-saga/effects';
import { all, call } from 'typed-redux-saga/macro';

import { categoriesSagas } from './categories/categories.saga';

import { userSagas } from './user/user.saga';

export function* rootSaga() {
    yield* all([call(categoriesSagas), call(userSagas)]);

}