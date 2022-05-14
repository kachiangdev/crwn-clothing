import { render } from "react-dom";
import "./spinner.style.scss";

const Spinner = () => {
    return (
        <div className="spinner-overlay">
            <div className="spinner-container">
            </div>
        </div>
    );
}

export default Spinner;