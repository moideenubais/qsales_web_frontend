import React from 'react'
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Header from "../Header";
import Footer from "../Footer";
import ShopListing from '../components/Shops/ShopListing';

const ShopPage = () => {
    const { shopId } = useParams();

  return (
    <React.Fragment>
      <Header />
      <Navigation />
      <Layout>
        <ShopListing shopId={shopId} />
      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default ShopPage
