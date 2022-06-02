// import { takeLatest, all, call, put } from "redux-saga/effects";
import { User } from "firebase/auth";
import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import {
    createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signInWithUserEmailAndPassword,
  signOutUser,
  AdditionalInformation
} from "../../utils/firebase/firebase.utils";

import { signInSuccess, signInFailed, signUpFailed, signOutFailed, signOutSuccess, EmailSignInStart, emailSignInStart, SignUpStart } from "./user.action";
import { USER_ACTION_TYPES } from "./user.type";

function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
  try {
    const userSnapShot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapShot) {
      yield* put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
    // put(signInSuccess(user));
  } catch (error) {
    put(signInFailed(error as Error));
  }
}

function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* signInWithEmail({ payload: { email, password }}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInWithUserEmailAndPassword,
      email,
      password
    );
    if (userCredential) { 
      yield* call(getSnapshotFromUserAuth, userCredential.user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* signUp({ payload: { email, password, displayName} }: SignUpStart) {
    try{
        console.log(displayName);
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
          yield* call(getSnapshotFromUserAuth, userCredential.user, {displayName});
        }
    } catch(error) {
        yield* put(signUpFailed(error as Error));
    }

}

function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

function* signOut() {
    try{  
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch(error) {
        yield* put(signOutFailed(error as Error));
    }
}

function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
  ]);
}
