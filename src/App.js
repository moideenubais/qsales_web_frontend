import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/product/:productId">
            <ProductPage />
          </Route>
          <Route path="/checkout">
            <CheckoutPage />
          </Route>
          <Route path="/category/:categoryId">
            <CategoryPage />
          </Route>
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
