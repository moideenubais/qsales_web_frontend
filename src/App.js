import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import jwtDecode from "jwt-decode";
import { setCurrentUser, setAuthToken } from "./redux/actions/auth";
import store from "./redux/store";
import { getCartInLocalStorage } from "./heper";

const Home = lazy(() => import("./pages/Home"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  const cartData = Object.values(getCartInLocalStorage());
  decoded.cart = decoded.cart ? [...decoded.cart, ...cartData] : cartData;
  console.log({ user: decoded });
  store.dispatch(setCurrentUser(decoded));
}

function WaitingComponent(Component) {
  return (props) => (
    <Suspense fallback={<>loading...</>}>
      <Component {...props} />
    </Suspense>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={WaitingComponent(Home)} />
          <Route
            path="/product/:productId"
            component={WaitingComponent(ProductPage)}
          />
          <Route path="/checkout" component={WaitingComponent(CheckoutPage)} />
          <Route
            path="/category/:categoryId"
            component={WaitingComponent(CategoryPage)}
          />
          <Route>
            <div className="container-fluid p-5 mx-auto display-1 d-flex align-items-center justify-content-center">
              404 Not Found!
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
