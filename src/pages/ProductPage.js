import React from "react";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import ProductDescription from "../components/ProductDescription";
import Header from "../Header";
import Footer from "../Footer";

function ProductPage() {
  return (
    <div>
      <Header />
      <Navigation />
      <Layout>
        <ProductDescription />
      </Layout>
      <Footer />
    </div>
  );
}

export default ProductPage;
