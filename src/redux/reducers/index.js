import { combineReducers } from "redux";
// import { productReducer,selectedProductReducer } from "./productReducer";
import { ActionTypes } from "../contants/action-types";
import commonReducer from "./commonReducer";
import { authReducer } from "./authReducer";

const reducers = combineReducers({
  authReducer,
  getAllCategoriesReducer: commonReducer(ActionTypes.GET_CATEGORY),
  getAllProductsReducer: commonReducer(ActionTypes.GET_PRODUCTS),
  getProductsReducer: commonReducer(ActionTypes.GET_PRODUCT_DETAILS),

  // product:selectedProductReducer,
});

export default reducers;
