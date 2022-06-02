import { FormHTMLAttributes, InputHTMLAttributes } from "react";
import "./form-input.style.scss";
type FormInputProp = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>

function FormInput({label, ...otherProps}: FormInputProp) {
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />    
            {label && (
                <label className={`${(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length) ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
        </div>
    );
}

export default FormInput;