import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const productInCart = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (productInCart) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const productInCart = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (productInCart.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CART_ACTION_TYPES = {
  ADD_CART_ITEM: "ADD_CART_ITEM",
  REMOVE_CART_ITEM: "REMOVE_CART_ITEM",
  CLEAR_CART_ITEM: "CLEAR_CART_ITEM",
  OPEN_CART: "OPEN_CART",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.ADD_CART_ITEM:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.OPEN_CART:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemsReducer = (newCartItems, type) => {
    switch (type) {
      case CART_ACTION_TYPES.ADD_CART_ITEM:
        return dispatch({
          type: CART_ACTION_TYPES.ADD_CART_ITEM,
          payload: newCartItems,
        });
      case CART_ACTION_TYPES.REMOVE_CART_ITEM:
        return dispatch({
          type: CART_ACTION_TYPES.REMOVE_CART_ITEM,
          payload: newCartItems,
        });
      case CART_ACTION_TYPES.CLEAR_CART_ITEM:
        return dispatch({
          type: CART_ACTION_TYPES.CLEAR_CART_ITEM,
          payload: newCartItems,
        });
    }
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems, CART_ACTION_TYPES.ADD_CART_ITEM);
  };
  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeItemFromCart(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems, CART_ACTION_TYPES.REMOVE_CART_ITEM);
  };
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems, CART_ACTION_TYPES.CLEAR_CART_ITEM);
  };

  const setIsCartOpen = (bool) => {
    dispatch({
      type: CART_ACTION_TYPES.OPEN_CART,
      payload: bool,
    });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
