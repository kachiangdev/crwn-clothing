import { Fragment } from "react";
import Spinner from "../../components/spinner/spinner.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectIsCategoriesIsLoading } from "../../store/categories/categories.selector";

const Category = () => {
    // const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
    const categoriesIsLoading = useSelector(selectIsCategoriesIsLoading);
    const {category} = useParams();


    return (
        <Fragment>
        {
            categoriesIsLoading ? (<Spinner/>) : 
            (
                (category) ?
                    (<CategoryPreview key={category} title={category} products={categoriesMap[category]}  />)
                :
                Object.keys(categoriesMap).map(title=> (
                    <CategoryPreview key={title} title={title} products={categoriesMap[title]} previewMode />
                    )
                )
            )
        }
        


        </Fragment>
    );
}

export default Category;