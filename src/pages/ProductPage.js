import React from "react";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import ProductDescription from "../components/ProductDescription";
import Header from "../Header";
import Footer from "../Footer";
import FloatingButton from "../components/whatsappFloatingButton/FloatingButton";
import { Helmet } from "react-helmet";
function ProductPage() {
  return (
    <div>
       <Helmet>
        <title>Product - Qsales</title>

      </Helmet>
      <Header />
      {
        window.innerWidth > 786 &&
        <Navigation />
      }
      <Layout>
        <ProductDescription />
      </Layout>
      <Footer />
      <FloatingButton />
    </div>
  );
}

export default ProductPage;
