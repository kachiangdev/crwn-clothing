import { CategoryItem } from "../categories/categories.type";

export enum CART_ACTION_TYPE {
    SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
    ADD_ITEM_TO_CART = 'cart/ADD_ITEM_TO_CART',
    REMOVE_ITEM_FROM_CART = 'cart/REMOVE_ITEM_FROM_CART',
}

export type CartItem =  CategoryItem & {
    quantity: number; 
}