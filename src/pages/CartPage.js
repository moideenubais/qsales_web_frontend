import React from "react";
import CartComponent from "../components/Cart";
import Navigation from "../components/Navigation";
import Header from "../Header";
import Footer from "../Footer";
import FloatingButton from "../components/whatsappFloatingButton/FloatingButton";
import { Helmet } from "react-helmet";
export default function CartPage() {
  return (
    <>
      <Helmet>
      <title>Cart - Qsales</title>

      </Helmet>
      <Header />
      {
        window.innerWidth > 786 &&
        <Navigation />
      }
      <CartComponent />
      <Footer />
      <FloatingButton />
    </>
  );
}
