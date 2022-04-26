import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useParams } from "react-router-dom";


const Category = () => {
    const {categoriesMap} = useContext(CategoriesContext);
    const {category} = useParams();
    console.log(categoriesMap);
    return (
        <Fragment>
        {
            (category) ?
                (<CategoryPreview key={category} title={category} products={categoriesMap[category]}  />)
            :
            Object.keys(categoriesMap).map(title=> (
                <CategoryPreview key={title} title={title} products={categoriesMap[title]} previewMode />
                )
            )
        }
        


        </Fragment>
    );
}

export default Category;