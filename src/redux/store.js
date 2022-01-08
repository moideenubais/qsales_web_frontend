// import {createStore} from "redux";
// import reducers from "./reducers/index";

// const store = createStore(
//     reducers,
//     {},
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//  );

//  export default store;

import { createStore, applyMiddleware, compose } from "redux";
import axiosMiddleware from "redux-axios-middleware";
import axios from "axios";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: "json",
});

const middlewareConfig = {
  interceptors: {
    request: [
      {
        async success(func, req) {
          if (localStorage.getItem("jwtToken")) {
            req.headers["x-auth-token"] = localStorage.getItem("jwtToken");
          }
          return req;
        },
        error(error) {
          return error;
        },
      },
    ],
    response: [
      {
        success(func, res) {
          return Promise.resolve(res);
        },
        error(func, error) {
          return Promise.reject(error);
        },
      },
    ],
  },
};

const saveToLocalStorage = (state) => {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("state", serializedState);
};

const loadFromLocalStorage = () => {
  const serializedState = localStorage.getItem("state");
  if (serializedState === null) return {};
  return JSON.parse(serializedState);
};

const presistedState = loadFromLocalStorage();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  presistedState,
  composeEnhancers(
    applyMiddleware(thunk, axiosMiddleware(client, middlewareConfig))
  )
);
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
