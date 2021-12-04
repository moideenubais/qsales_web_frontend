import React from "react";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Header from "../Header";
import Footer from "../Footer";

function CheckoutPage() {
  return (
    <React.Fragment>
      <Header />
      <Navigation />
      <Layout>
        <CheckoutSteps />
      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default CheckoutPage;
