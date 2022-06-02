import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

import { CategoryItem } from "../categories/categories.type";

import { CartItem, CART_ACTION_TYPE } from "./cart.type";

type addItemPayload = {
  productToAdd:CategoryItem;
}
type removeOrDeleteItemPayload = {
  productToRemove:CartItem;
  removeAllQuantity:boolean;
}
type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPE.SET_IS_CART_OPEN,
  boolean
>;

type AddItemToCart = ActionWithPayload<
  CART_ACTION_TYPE.ADD_ITEM_TO_CART,
  addItemPayload
>;

type RemoveOrDeleteItemFromCart = ActionWithPayload<
  CART_ACTION_TYPE.REMOVE_ITEM_FROM_CART,
  removeOrDeleteItemPayload
>;

export const setIsCartOpen = withMatcher((val:boolean): SetIsCartOpen =>
  createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, val));

export const addItemToCart = withMatcher((productToAdd:CategoryItem): AddItemToCart =>
  createAction(CART_ACTION_TYPE.ADD_ITEM_TO_CART, {
    productToAdd: productToAdd,
  }));

export const removeItemFromCart = withMatcher((productToRemove: CartItem): RemoveOrDeleteItemFromCart =>
  createAction(CART_ACTION_TYPE.REMOVE_ITEM_FROM_CART, {
    productToRemove: productToRemove,
    removeAllQuantity: false,
  }));

export const deleteItemFromCart = withMatcher((productToRemove: CartItem): RemoveOrDeleteItemFromCart =>
  createAction(CART_ACTION_TYPE.REMOVE_ITEM_FROM_CART, {
    productToRemove: productToRemove,
    removeAllQuantity: true,
  }));
