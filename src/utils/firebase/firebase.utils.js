import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    addDoc,
    writeBatch,
    getDocs,
    query,
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const signInWithFacebookPopup = () => signInWithPopup(auth, facebookProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);


    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInfo});
        } catch(error) {
            console.log('error creating the user', error);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInWithUserEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}
export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const exportDataToFireStore = (data) => {
    try{
        data.forEach(element => {
            const title = element.title;
            element.items.forEach(async subElement => {
                const docRef = await addDoc(collection(db, title), {...subElement});
                console.log("Document written with ID: ", docRef.id);    
            });
        });

    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);


    objectToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    });
    await batch.commit();
    console.log("done");
}

export const getCollectionAndDocuments = async () => {
    const collectionRef = await collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
    return categoryMap;
}