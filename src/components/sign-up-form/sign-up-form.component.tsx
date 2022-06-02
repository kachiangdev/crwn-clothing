import { useState, ChangeEvent, FormEvent} from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../custom-button/custom-button.component';

import "./sign-up-form.style.scss";
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.action';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


function SignUpForm() {
    const dispatch = useDispatch()
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleSubmit = async (event:FormEvent<HTMLFormElement>):Promise<void> => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try{ 
            dispatch(signUpStart(email, password, displayName));
            setFormFields(defaultFormFields);
        } catch (error:any) {
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use!")
            }
            else if (error.code === "auth/weak-password") {
                alert("Please choose a password at least 6 characters long");
            }
            console.log("user creation encountered an error!", error);
        }
        
    }

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const{ name, value} = event.target;

        setFormFields({...formFields, [name]: value});

    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" name="displayName" value={displayName} onChange={handleChange} required />
                <FormInput label="Email" type="email" name="email" value={email} onChange={handleChange} required />
                <FormInput label="Password" type="password" name="password" value={password} onChange={handleChange} required />
                <FormInput label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )

}

export default SignUpForm;