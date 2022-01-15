import React from "react";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Header from "../Header";
import Footer from "../Footer";
import FloatingButton from "../components/whatsappFloatingButton/FloatingButton";

function CheckoutPage() {
  return (
    <React.Fragment>
      <Header />
      <Navigation />
      <CheckoutSteps />
      <Footer />
      <FloatingButton />
    </React.Fragment>
  );
}

export default CheckoutPage;
