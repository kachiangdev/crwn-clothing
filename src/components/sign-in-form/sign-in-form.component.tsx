import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../custom-button/custom-button.component";
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";

import "./sign-in-form.style.scss"

const defaultFormFields = {
    email: '',
    password: ''
}

function SignInForm() {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const dispatch = useDispatch();
    const loginGoogleUser = async() => {
        dispatch(googleSignInStart());
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const{ name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{ 
            dispatch(emailSignInStart(email, password));
            setFormFields(defaultFormFields);
        } catch (error: any) {
            console.log(error.code)
            switch(error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password for email");
                    break;
                case "auth/user-not-found":
                    alert("no user associated wit this email");
                    break;
                default:
                    console.log(error);
            }
        }
        
    }
    
    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' name='email' value={email} onChange={handleChange} required />
                <FormInput label='Password' type='password' name='password' value={password} onChange={handleChange} required />
                <div className="buttons-container">
                    <Button type='submit'>Sign in</Button>
                    <Button type='button' buttonType='google' onClick={loginGoogleUser}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;