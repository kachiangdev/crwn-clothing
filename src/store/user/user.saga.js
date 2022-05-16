import { takeLatest, all, call, put } from "redux-saga/effects";
import {
    createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signInWithUserEmailAndPassword,
  signOutUser
} from "../../utils/firebase/firebase.utils";

import { signInSuccess, signInFailed, signUpFailed, signOutFailed, signOutSuccess } from "./user.action";
import { USER_ACTION_TYPES } from "./user.type";

function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapShot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
    // put(signInSuccess(user));
  } catch (error) {
    put(signInFailed(error));
  }
}

function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInWithUserEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* signUp({ payload: { email, password, displayName} }) {
    try{
        console.log(displayName);
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user, {displayName});
    } catch(error) {
        yield put(signUpFailed(error));
    }

}

function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

function* signOut() {
    try{
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch(error) {
        yield put(signOutFailed(error));
    }
}

function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
  ]);
}
