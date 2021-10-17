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
          req.headers["x-auth-token"] = localStorage.getItem("jwtToken");
          console.log("interceptors request", req); // contains information about request object
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
          console.log("AXIOS RESPONSE = ", res); // contains information about request object
          return Promise.resolve(res);
        },
        error(func, error) {
          console.log("API ERROR", error);
          const errorStatus = error.response.status;
          // if (errorStatus === 401) window.location.href = "/login";
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
