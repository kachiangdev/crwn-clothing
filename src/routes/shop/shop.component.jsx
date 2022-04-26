import {Routes, Route} from 'react-router-dom'

import Category from '../category/category.component';

import "./shop.style.scss";

function Shop() {
    return (
        <Routes>
            <Route index element={<Category />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );

}

export default Shop;