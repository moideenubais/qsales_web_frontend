import React from "react";
import CartComponent from "../components/Cart";
import Navigation from "../components/Navigation";
import Header from "../Header";
import Footer from "../Footer";

export default function CartPage() {
  return (
    <>
      <Header />
      <Navigation />
      <CartComponent />
      <Footer />
    </>
  );
}
