import React from "react";
import { Link } from "react-router-dom";
import { DirectoryItem } from "../../routes/home/home.component";
import "./category-item.style.scss";

type CategoryItemProp = {
  category: DirectoryItem;
}

function CategoryItem({ category }: CategoryItemProp) {
    const { imageUrl, title } = category;
    return (
        <div className="category-container">
          <div className="background-image" style={{backgroundImage: `url(${imageUrl})`}}/>
          <div className="category-body-container">
            <Link to={`/shop/${title}`}>
              <h2>{title}</h2>
              <p>Shop Now</p>
            </Link> 
          </div>
        </div>
    );
}

export default CategoryItem;