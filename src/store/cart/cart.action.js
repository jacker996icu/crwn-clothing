import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPE } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
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
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const setIsCartOpen = (isCartOpen) =>
  createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, isCartOpen);

export const addItemToCart = (cartItems, productToAdd) => {
  return createAction(
    CART_ACTION_TYPE.SET_CART_ITEMS,
    addCartItem(cartItems, productToAdd)
  );
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  return createAction(
    CART_ACTION_TYPE.SET_CART_ITEMS,
    removeCartItem(cartItems, cartItemToRemove)
  );
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  return createAction(
    CART_ACTION_TYPE.SET_CART_ITEMS,
    clearCartItem(cartItems, cartItemToClear)
  );
};
