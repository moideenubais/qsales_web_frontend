import React from 'react'
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Header from "../Header";
import Footer from "../Footer";
import BrandsListing from '../components/Brands/BrandsListing';
import FloatingButton from '../components/whatsappFloatingButton/FloatingButton';
import {Helmet} from "react-helmet";

const BrandPage = () => {
    const { brandId } = useParams();

  return (
    <React.Fragment>
      <Helmet>
      <title>Brand - Qsales</title>

      </Helmet>
      <Header />
      {
        window.innerWidth > 786 &&
        <Navigation />
      }
      <Layout>
        <BrandsListing brandId={brandId} />
      </Layout>
      <Footer />
      <FloatingButton />
    </React.Fragment>
  );
}

export default BrandPage
