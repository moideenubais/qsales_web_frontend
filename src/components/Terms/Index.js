import HTMLReactParser from "html-react-parser";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Strings from "../../Constants";
import Footer from "../../Footer";
import Header from "../../Header";
import Navigation from "../Navigation";
import FloatingButton from "../whatsappFloatingButton/FloatingButton";
import InfringmentRights from "./InfringmentRights";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfUse from "./TermsOfUse";
import { Helmet } from 'react-helmet';

const Index = () => {
  const { type } = useParams();
  // const location =useLocation();

  // React.useLayoutEffect(()=>{
  //   document?.getElementById("navigation")?.scrollIntoView()
  // },[location])
  return (
    <>
      {/* <Helmet>
                <title>{type === "privacy-policy" ? (
          <h1>Privacy Policy - Qsales</h1>
        ) : type === "terms-of-use" ? (
            <h1>Terms of Use - Qsales</h1>
        ) : type === "terms-of-sale" ? (
            <h1>Terms of Sale - Qsales</h1>
        ) : (
          ""
        )}</title>
            </Helmet> */}
      <Header />
      <Navigation />
      <div className="bg-white p-2 col-sm-12 col-sm-12 col-md-8 mx-auto terms-container">
        {type === "privacy-policy" ? (
          <h1>Privacy Policy</h1>
        ) : type === "terms-of-use" ? (
          <h1>Terms of Use</h1>
        ) : type === "terms-of-sale" ? (
          <h1>Terms of Sale</h1>
        ) : type === "refund-policy" ? (
          <h1>Refund And Return Policy</h1>
        ) : type === "shipping-policy" ? (
          <h1>Shipping Policy</h1>
        ) : (
          ""
        )}
      </div>
      <hr className="col-sm-12 col-sm-12 col-md-8 mx-auto" />
      <div className="bg-white p-2 col-sm-12 col-md-8 mx-auto terms-container">
        {type === "privacy-policy" ? (
          HTMLReactParser(Strings.privacyPolicy)
        ) : type === "terms-of-use" ? (
          HTMLReactParser(Strings.termsAndConditions)
        ) : type === "terms-of-sale" ? (
          HTMLReactParser(Strings.infringementPolicy)
        ) : type === "refund-policy" ? (
          HTMLReactParser(Strings.refundPolicy)
          ) : type === "shipping-policy" ? (
            HTMLReactParser(Strings.shippingPolicy)
          ) : (
          ""
        )}
      </div>
      <Footer />
      <FloatingButton />
    </>
  );
};

export default Index;
