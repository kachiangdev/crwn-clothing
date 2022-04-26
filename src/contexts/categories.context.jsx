import { createContext, useState, useEffect } from "react";
import SHOP_DATA from "../shop-data.js";
import { exportDataToFireStore, addCollectionAndDocuments, getCollectionAndDocuments} from "../utils/firebase/firebase.utils.js";
//as the actual value you want to access
export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);
    useEffect(()=>{
        const getCategoriesMap = async () => {
            const categoriesMap = await getCollectionAndDocuments();
            setCategoriesMap(categoriesMap)
            // console.log(categoriesMap);
        }
        getCategoriesMap();
    },[])
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = {categoriesMap};
    // exportDataToFireStore(SHOP_DATA);
    // useEffect(()=>{
    //     const unsubscribe = onAuthStateChangedListener((user)=>{
    //         console.log(user);
    //         if (user) {
    //             createUserDocumentFromAuth(user);
    //         }
    //         setCurrentUser(user);
    //     });

    //     return unsubscribe;
    // }, []);

    return <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
}