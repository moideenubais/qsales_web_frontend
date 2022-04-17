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
import { Helmet } from 'react-helmet'
import ShopContainer from "../components/Shops/ShopContainer";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../components/Common/ScrollToTop";
// import CategoriesList from '../components/CategoriesList';

function Home() {

  const location=useLocation();

  // const [rendered,setRendered]=React.useState(false);
  React.useLayoutEffect(()=>{

    // setTimeout(()=>{
    //   window.scrollTo({
    //     top: 100,
    //     behavior: 'smooth'
    //   })
    // },0)
    // document.body.scrollTop = 0;
    //   // document?.getElementById("top-bar")?.scrollIntoView()
    // if(rendered){
    //   window.scrollTo({
    //     top: 100,
    //     behavior: 'smooth'
    //   })
    // }
    // else
    // setRendered(true);
   
  },[location])

  return (
    <div>
       <Helmet>
        <title>Best Online Household Shopping Website in Qatar - Qsales</title>

      </Helmet>
      {/* <ScrollToTop /> */}
      {/* <CarouselHome /> */}
      <Header />
      {
        window.innerWidth > 786 &&
        <Navigation />
      }
      
      <HomeSlider />
  
      {/* <CategoriesList /> */}
      <ProductsListHolder />
      <BrandsContainer />
      {/* <ShopContainer /> */}
      <Footer />
      <FloatingButton />
    </div>
  );
}

export default Home;
