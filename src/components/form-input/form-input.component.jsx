import "./form-input.style.scss";


function FormInput({label, ...otherProps}) {
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />    
            {label && (
                <label class={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
        </div>
    );
}

export default FormInput;