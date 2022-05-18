import "./custom-button.style.scss";

function Button ({children, buttonType, isLoading, ...otherProps}) {

    const BUTTON_TYPE_CLASSES = {
        google: 'google-sign-in',
        inverted: 'inverted'
    }

    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} disabled={isLoading} {...otherProps}>
            {isLoading ? <div className="button-spinner"></div> : children}
        </button>
    );

}

export default Button;