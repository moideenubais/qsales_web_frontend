import React from 'react'
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Header from "../Header";
import Footer from "../Footer";
import ShopListing from '../components/Shops/ShopListing';
import FloatingButton from '../components/whatsappFloatingButton/FloatingButton';
import { Helmet } from 'react-helmet';
const ShopPage = () => {
    const { shopId } = useParams();

  return (
    <React.Fragment>
       <Helmet>
        <title>Shop - Qsales</title>

      </Helmet>
      <Header />
      {
        window.innerWidth > 786 &&
        <Navigation />
      }
      <Layout>
        <ShopListing shopId={shopId} />
      </Layout>
      <Footer />
      <FloatingButton />
    </React.Fragment>
  );
}

export default ShopPage
