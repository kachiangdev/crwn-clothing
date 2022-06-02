import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import "./custom-button.style.scss";
type ButtonProps = {
    children: ReactNode;
    buttonType?: string;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;


function Button ({children, buttonType="", isLoading, ...otherProps}:ButtonProps) {

    const BUTTON_TYPE_CLASSES:{[key:string]:string}= {
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