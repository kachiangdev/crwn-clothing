import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import "./category-preview.style.scss";

const CategoryPreview = ({title, products, previewMode}) => {
    const displayedProducts = [...products];
    if (previewMode) {
        if (products.length >= 4) {
            displayedProducts.length = 4;
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
            <div className="products-container">
                {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </>
    );
}

export default CategoryPreview;