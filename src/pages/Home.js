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
import HomeSlider from "../components/HomeSlider";
import ShopContainer from "../components/Shops/ShopContainer";
// import CategoriesList from '../components/CategoriesList';

function Home() {
  return (
    <div>
      <CarouselHome />
      <Header />
      <Navigation />
      <HomeSlider />
  
      {/* <CategoriesList /> */}
      <ProductsListHolder />
      <BrandsContainer />
      <ShopContainer />
      <Footer />
      <FloatingButton />
    </div>
  );
}

export default Home;
