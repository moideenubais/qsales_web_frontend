import React from 'react'
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import Header from "../Header";
import Footer from "../Footer";
import BrandsListing from '../components/Brands/BrandsListing';

const BrandPage = () => {
    const { brandId } = useParams();

  return (
    <React.Fragment>
      <Header />
      <Navigation />
      <Layout>
        <BrandsListing brandId={brandId} />
      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default BrandPage
