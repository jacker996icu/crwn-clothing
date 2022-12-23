import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartReducer) => cartReducer.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartReducer) => cartReducer.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
