import { combineReducers } from "redux";
// import { productReducer,selectedProductReducer } from "./productReducer";
import { ActionTypes } from "../contants/action-types";
import commonReducer from "./commonReducer";
import { authReducer } from "./authReducer";

const reducers = combineReducers({
  authReducer,
  getAllCategoriesReducer: commonReducer(ActionTypes.GET_CATEGORY),
  getCategoryDetailsReducer: commonReducer(ActionTypes.GET_CATEGORY_DETAILS),
  getAllProductsReducer: commonReducer(ActionTypes.GET_PRODUCTS),
  getProductsReducer: commonReducer(ActionTypes.GET_PRODUCT_DETAILS),
  getAdsReducer: commonReducer(ActionTypes.GET_ADS),
  getReviewReducer: commonReducer(ActionTypes.GET_REVIEW),
  getCartDetailsReducer: commonReducer(ActionTypes.GET_CART_DETAILS),
  getUser: commonReducer('GET_USER'),
  
  // product:selectedProductReducer,
});

export default reducers;
