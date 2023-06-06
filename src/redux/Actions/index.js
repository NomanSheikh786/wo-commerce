
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const ADD_QUANTITY = 'ADD_QUANTITY';
const SUB_QUANTITY = 'SUB_QUANTITY';
const RESET_CART = 'RESET_CART';
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

export const constants = {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  RESET_CART,
  LOGIN_USER,
  LOGOUT_USER,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST
};


const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});
const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});
const addQuantity = (productId) => ({
  type: ADD_QUANTITY,
  payload: productId
});
const subQuantity = (productId) => ({
  type: SUB_QUANTITY,
  payload: productId
});
const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user
});
const logoutUser = (user) => ({
  type: LOGOUT_USER,
  payload: user
});

const addToWishlist = (productId) => ({
  type: ADD_TO_WISHLIST,
  payload: productId,
});

const removeFromWishlist = (productId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: productId,
});


const resetCart = () => ({ type: RESET_CART });

export const actions = {
  addToCart,
  removeFromCart,
  addQuantity,
  subQuantity,
  resetCart,
  loginUser,
  logoutUser,
  addToWishlist,
  removeFromWishlist
};