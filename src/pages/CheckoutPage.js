import React from "react";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Header from "../Header";
import Footer from "../Footer";
import FloatingButton from "../components/whatsappFloatingButton/FloatingButton";
import {Helmet} from "react-helmet"
function CheckoutPage() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Checkout - Qsales</title>

      </Helmet>
      <Header />
      {
        window.innerWidth > 786 &&
        <Navigation />
      }
      <CheckoutSteps />
      <Footer />
      <FloatingButton />
    </React.Fragment>
  );
}

export default CheckoutPage;
