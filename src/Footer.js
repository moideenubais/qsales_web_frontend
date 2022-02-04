import React from "react";
import { Link,useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SellerForm from "./components/SignIn/SellerForm";
import Modal from "react-bootstrap/Modal";
import SubscriptionForm from "./components/SubscriptionForm/SubscriptionForm";
import Strings from "./Constants";
import CustomModal from "./components/Common/CustomModal";
import SummaryModal from "./components/SummaryModal";

function Footer() {
  const { t } = useTranslation();
  const location=useLocation();
  const [showModal, setShowModal] = React.useState(false);
  const [show, setShow] = React.useState(false);

  //
  const [privacyModal,setPrivacyModal]=React.useState(false);
  const [modalTitle,setModalTitle]=React.useState("");
  const setShowPrivacyModal=(title)=>{
    setPrivacyModal(true);
    setModalTitle(title);
  }
 
  const [orderSummary,setOrderSummary]=React.useState(!!location?.state?.orderSummary)
  const closeOrderSummary=()=>{
    setOrderSummary(false);
    window.history.replaceState({}, document.title);
  }
  return (
    <React.Fragment>
      {/* This is for displaying seller form*/}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="Seller form"
        centered
        animation={false}
      >
        <SellerForm closeButton onSubmit={() => setShow(false)} />
      </Modal>
      {
        orderSummary &&
         <Modal
         show={orderSummary}
         aria-labelledby="example-modal-sizes-title-md"
         size="md"
         aria-labelledby="Order Summary"
         centered
         onHide={closeOrderSummary}
         
       >
        <SummaryModal closeButton summary={location?.state?.orderSummary} />
        </Modal>
      }
      <div className="col-md-12 bg-light border py-5 mt-4">
        <div className="col-9 mx-auto  pb-4">
          <div className="row">
            <div className="col-md-6 col-sm-9 mx-auto">
              <h5 className="fs-5 fw-bold mb-2">{t("helpHeading")}</h5>
              <p className="small text-secondary">{t("reachOutText")}</p>

              <div className="small mt-4 d-flex flex-wrap flex-row">
                <div className=" border-start border-4 ps-3">
                  <h6 className="small fw-normal">{t("helpCenter")}</h6>
                  <p className="small text-secondary">customersupport@qsales2022.com</p>
                </div>
                <div className="ms-5 border-start border-4 ps-3 support-2nd">
                  <h6 className="small fw-normal">{t("customerSupport")}</h6>
                  <p className="small text-secondary">support@qsales2022.com</p>
                </div>
              </div>
              <SubscriptionForm />
             
              <div className="pt-2">
               <small className="d-block text-muted">Email: contact@qsales2022.com/info@qsales2022.com</small>
               <small className="d-block text-muted">Office Address: Office no. 8, Building 84,street 205,zone 56</small>
              </div>
            </div>
            <div className="col-md-6 col-sm-9 mx-auto border-start border-4 px-2 mt-md-0 mt-sm-2  d-flex flex-column">
              <h6 className="fs-5 fw-bold mb-2">{t("downloadOurApp")}</h6>
              <p className="small text-secondary ">{t("getOffersOnApp")}</p>
              <div className="mt-md-4">
                <img src="../assets/images/app-store.svg" className="" />
                <img src="../assets/images/google-play.svg" className="ms-3" />
              </div>
              <div className="py-2 my-1 d-flex flex-row">
                <img width="45" height="45" src="../assets/images/support.png" />
                <div>
                  <p className="text-muted small">For Sales and Support Queries</p>
                  <h4 className="text-muted">{Strings.contactNumber}</h4>
                </div>
              </div>
              <div className=" d-flex flex-row">
                <a className="mx-1" href="http://instagram.com/_u/qsales2022/" target="_blank">
                  <div className="floating-btn">
                    <img
                      src="../assets/images/Insta2.png"
                      width="28"
                      height="28"
                      className="img-fluid"
                    />
                  </div>
                </a>
                <a className="mx-1" href="https://facebook.com/qsales2022/" target="_blank">
                  <div className="floating-btn">
                    <img
                      src="../assets/images/facebook.png"
                      width="28"
                      height="28"
                      className="img-fluid"
                    />
                  </div>
                </a>
                <a className="mx-1" href="https://www.linkedin.com/company/qsales2022" target="_blank">
                  <div className="floating-btn">
                    <img
                      src="../assets/images/linkdin.png"
                      width="28"
                      height="28"
                      className="img-fluid"
                    />
                  </div>
                </a>
                {/* <a className="mx-1" href="http://facebook.com" target="_blank">
                  <div className="floating-btn">
                    <img
                      src="../assets/images/twitter.png"
                      width="28"
                      height="28"
                      className="img-fluid"
                    />
                  </div>
                </a> */}
              </div>
              {/* <div className="pt-3">
                <h6 className="text-muted">- FREE DELIVERY FOR ORDERS ABOVE QR 100 </h6>
                <h6 className="text-muted">- 24 HOURS DELIVERY IN QATAR</h6>
              </div> */}

            </div>
          </div>
        </div>
        
        <div className="d-flex flex-row justify-content-between  flex-wrap col-9 mx-auto py-3 border-top footer-features">
          <div className="d-flex ">
          <img src="https://img.icons8.com/ios-glyphs/30/000000/cash-.png" width="20" height="20"/>
            <span>Cash on Delivery</span>
          </div>
          <div className="d-flex ">
          <img src="https://img.icons8.com/ios/50/000000/deliver-food.png" width="20" height="20"/>
            <span>24 Hours Delivery</span>
          </div>
          <div className="d-flex">
          <img src="https://img.icons8.com/ios-filled/50/000000/checkout.png" width="20" height="20"/>
            <span>Easy Checkout</span>
          </div> 
          {/* <div className="d-flex">
          <img src="https://img.icons8.com/ios/50/000000/home--v1.png" width="20" height="20"/>
            <span>Home Delivery</span>
          </div>  */}
           <div className="d-flex">
          <img src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-support-ecommerce-vitaliy-gorbachev-lineal-vitaly-gorbachev.png" width="20" height="20"/>
            <span>24/7 Customer Support</span>
          </div>
          <div className="d-flex">
          <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-quality-business-kiranshastry-lineal-kiranshastry-1.png" width="20" height="20"/>
            <span>Premium Quality</span>
          </div>
        </div>
        <div className="d-flex flex-column col-9 mx-auto pt-3 border-top">
          <div className="col-6 d-flex flex-row flex-wrap justify-content-between text-decoration-none ">
            <Link
               to="/policy/privacy-policy"
              // onClick={() =>setShowPrivacyModal("privacyPolicy")}
              className="small text-secondary text-decoration-none"
            >
              <p className="small">{t("privacyPolicy")}</p>
            </Link>
            <Link
              to="/policy/terms-of-use"
              // onClick={() =>setShowPrivacyModal("termsOfUse")}
              className="small text-secondary text-decoration-none"
            >
              <p className="small text-decoration-none">{t("termsOfUse")}</p>
            </Link>
            <Link to="" className="small text-secondary text-decoration-none">
              <p
                className="small text-decoration-none"
                onClick={() => setShow(true)}
              >
                {t("sellWithUs")}
              </p>
            </Link>
            <Link to="" className="small text-secondary text-decoration-none">
              <p className="small text-decoration-none">
                {t("warrantyPolicy")}
              </p>
            </Link>
            <Link 
            to="/policy/terms-of-sale"
            // onClick={() =>setShowPrivacyModal("termsOfSale")} 
            className="small text-secondary text-decoration-none">
              <p className="small text-decoration-none">{t("termsOfSale")}</p>
            </Link>
          </div>
          <div className="col-4 d-flex justify-content-start mt-4">
            <p className="small text-secondary">
              <span class="small">{t("copyRightText")}</span>
            </p>
          </div>
        </div>
      </div>
      {
        (privacyModal && modalTitle==="privacyPolicy" )?
        <CustomModal 
        title={t("privacyPolicy")}
        setShowModal={setPrivacyModal}
         >
        {Strings.privacyPolicy}
        </CustomModal>:
        (privacyModal && modalTitle==="termsOfSale" )?
        
        <CustomModal 
        title={t("termsOfSale")}
        setShowModal={setPrivacyModal}
         >
        {Strings.termsAndConditions}
        </CustomModal>
        :
        (privacyModal && modalTitle==="termsOfUse" )?
        <CustomModal 
        title={t("termsOfUse")}
        setShowModal={setPrivacyModal}
         >
        {Strings.infringementPolicy}
        </CustomModal>
        :""
      }
      
    </React.Fragment>
  );
}

export default Footer;
