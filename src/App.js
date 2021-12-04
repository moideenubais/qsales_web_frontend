import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import jwtDecode from "jwt-decode";
import { setCurrentUser, setAuthToken } from "./redux/actions/auth";
import store from "./redux/store";
import { getCartInLocalStorage } from "./heper";
import { englishTranslations, arabicTranslations } from "./translation";

const Home = lazy(() => import("./pages/Home"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: englishTranslations },
      ar: { translation: arabicTranslations },
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

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
  const { t } = useTranslation();
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
          <Route path="/cart" component={WaitingComponent(CartPage)} />
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
