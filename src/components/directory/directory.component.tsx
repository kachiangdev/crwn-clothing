import { DirectoryItem } from "../../routes/home/home.component";
import CategoryItem from "../category-item/category-item.component";

import "./directory.style.scss";

type DirectoryProp = {
    categories: DirectoryItem[];
}

function Directory({categories}: DirectoryProp) {
    

    return (
        <div className="directory-container">
            { categories.map((category) =>(
            <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    );
}

export default Directory;