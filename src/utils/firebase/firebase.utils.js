import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    FacebookAuthProvider 
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCnwUdVCRJQRP5v4Vk0qYzXtL6_6UTfOPc",
    authDomain: "crwn-db-ac339.firebaseapp.com",
    projectId: "crwn-db-ac339",
    storageBucket: "crwn-db-ac339.appspot.com",
    messagingSenderId: "437526379790",
    appId: "1:437526379790:web:a261af081ec53b4ed16b5f",
    measurementId: "G-P1Y7FE00D2"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
    prompt: "select_account"
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebookPopup = () => signInWithPopup(auth, facebookProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);


    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch(error) {
            console.log('error creating the user', error);
        }
    }

    return userDocRef;
}