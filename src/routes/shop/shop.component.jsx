import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {Routes, Route, useParams} from 'react-router-dom'
// import ProductCard from "../../components/product-card/product-card.component";

import "./shop.style.scss";

function Shop() {
    const {categoriesMap} = useContext(CategoriesContext);
    const {category} = useParams();
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

export default Shop;