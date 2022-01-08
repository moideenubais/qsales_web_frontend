import React from "react";
import CarouselHome from "../components/CarouselHome";
import Navigation from "../components/Navigation";
import Header from "../Header";
import "pure-react-carousel/dist/react-carousel.es.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../Footer";
import ProductsListHolder from "../components/Products/ProductsListHolder";
import FloatingButton from "../components/whatsappFloatingButton/FloatingButton";
import BrandsContainer from "../components/Brands/BrandsContainer";
// import CategoriesList from '../components/CategoriesList';

function Home() {
  return (
    <div>
      <CarouselHome />
      <Header />
      <Navigation />
      
      {/* <CategoriesList /> */}
      <BrandsContainer />
      <ProductsListHolder />
      <Footer />
      <FloatingButton />
    </div>
  );
}

export default Home;
