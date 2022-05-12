import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

const Category = () => {
    // const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
    const {category} = useParams();
    console.log("render/re-rendering category component")


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