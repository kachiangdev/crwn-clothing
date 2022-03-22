import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";

import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    signInWithFacebookPopup, 
    createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

function SignIn() {

    useEffect(async () => {
        const response = await getRedirectResult(auth);
        if (response) {
            const userDocRef = createUserDocumentFromAuth(response.user);
        }
    }, 
    []);

    const loginGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(user);

    }

    const loginGoogleRedirectUser = async () => {
        const { user } = await signInWithGoogleRedirect();
        console.log( user );

    }    

    
    const loginFacebookUser = async () => {
        try{
            const facebookResponse = await signInWithFacebookPopup();
            console.log(facebookResponse);
        } catch(error) {
            console.log(error)
        }
    }


    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={loginGoogleUser}>
                Sign in with Google Popup
            </button>
            <button onClick={loginGoogleRedirectUser}>
                Sign in with Google Redirect
            </button>
            <button onClick={loginFacebookUser}>
                Sign in with Facebook Popup
            </button>
            <SignUpForm />
        </div>
    );
}

export default SignIn;