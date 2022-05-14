import {Routes, Route} from 'react-router-dom'
import Category from '../category/category.component';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategoriesAsync } from '../../store/categories/categories.action';

import "./shop.style.scss";

function Shop() {

    const dispatch = useDispatch();

    useEffect(()=>{ 
        // const getCategories = async () => {

        //     const categoriesArray = await getCollectionAndDocuments();
        //     dispatch(setCategories(categoriesArray));
        // }
        // getCategories();
        dispatch(fetchCategoriesAsync());
      },[dispatch])

    return (
        <Routes>
            <Route index element={<Category />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );

}

export default Shop;