import {
    signInWithGooglePopup, 
    signInWithFacebookPopup, 
    createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";


function SignIn() {

    const loginGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(user);

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
            <button onClick={loginFacebookUser}>
                Sign in with Facebook Popup
            </button>
        </div>
    );
}

export default SignIn;