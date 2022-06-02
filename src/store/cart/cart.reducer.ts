import { AnyAction } from "redux";
import { CategoryItem } from "../categories/categories.type";
import { CartItem } from "./cart.type";
import {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
} from "./cart.action";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem):CartItem[] => {
  //check if product has already exist
  //if found, increment quantity
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //return new array with modified carItem
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem,
  removeAllQuantity: boolean
): CartItem[] => {
  const retVal = [...cartItems];
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === productToRemove.id) {
      if (cartItems[i].quantity > 1 && !removeAllQuantity) {
        retVal[i].quantity = cartItems[i].quantity - 1;
      } else {
        retVal.splice(i, 1);
      }
      break;
    }
  }
  return retVal;
};

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (addItemToCart.match(action)) {
    return {
      ...state,
      cartItems: addCartItem(state.cartItems, action.payload.productToAdd),
    };
  }

  if (removeItemFromCart.match(action) || deleteItemFromCart.match(action)) {
    return {
      ...state,
      cartItems: removeCartItem(
        state.cartItems,
        action.payload.productToRemove,
        action.payload.removeAllQuantity
      ),
    };
  }

  return state;
};
