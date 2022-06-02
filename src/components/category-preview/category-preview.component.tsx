import { Link } from "react-router-dom";
import { CategoryItem } from "../../store/categories/categories.type";

import ProductCard from "../product-card/product-card.component";

import "./category-preview.style.scss";

type CategoryPreviewProp = {
    title: string;
    products: CategoryItem[];
    previewMode?: boolean;
}

const CategoryPreview = ({title, products, previewMode}: CategoryPreviewProp) => {
    let displayedProducts = products;
    if (previewMode && displayedProducts) {
        if (products.length >= 4) {
            displayedProducts = displayedProducts.filter((el, idx) => idx < 4);
        }

    }
    return (
        <>
            {
                (previewMode) ?
                <h2>
                    <span>
                        <Link to={`${title}`} >
                        {title.toUpperCase()}
                        </Link>
                    </span>
                </h2>
                : <h2>{title.toUpperCase()}</h2>
            }
            {
                (displayedProducts) && 
                <div className="products-container">
                    {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            }
        </>
    );
}

export default CategoryPreview;