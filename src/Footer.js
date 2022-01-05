import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SellerForm from "./components/SignIn/SellerForm";
import Modal from "react-bootstrap/Modal";
import SubscriptionForm from "./components/SubscriptionForm/SubscriptionForm";

function Footer() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const [show, setShow] = React.useState(false);
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
        <SellerForm closeButton />
      </Modal>
      <div className="col-12 bg-light border py-5 mt-4">
        <div className="col-9 mx-auto d-flex flex-row  pb-4">
          <div className="col-6">
            <h5 className="fs-5 fw-bold mb-2">{t("helpHeading")}</h5>
            <p className="small text-secondary">{t("reachOutText")}</p>

            <div className="small mt-4 d-flex flex-row">
              <div className=" border-start border-4 ps-3">
                <h6 className="small fw-normal">{t("helpCenter")}</h6>
                <p className="small text-secondary">help.qsales.com</p>
              </div>
              <div className="ms-5 border-start border-4 ps-3">
                <h6 className="small fw-normal">{t("customerSupport")}</h6>
                <p className="small text-secondary">customer.qsales.com</p>
              </div>
            </div>
            <SubscriptionForm />
          </div>
          <div className="col-6 border-start ps-5 d-flex flex-column">
            <h6 className="fs-5 fw-bold mb-2">{t("downloadOurApp")}</h6>
            <p className="small text-secondary ">{t("getOffersOnApp")}</p>
            <div className="mt-4">
              <img src="../assets/images/app-store.svg" className="" />
              <img src="../assets/images/google-play.svg" className="ms-3" />
            </div>
            <div className="mt-3">
              <a href="http://instagram.com/_u/qsales2022/" target="_blank">
                <div className="floating-btn">
                    <img src="../assets/images/insta.png" width="28" height="28" className="img-fluid"/>
                </div>
            </a>
          </div>
          </div>
          
        </div>

        <div className="d-flex flex-column col-9 mx-auto pt-3 border-top">
          <div className="col-6 d-flex flex-row flex-wrap justify-content-between text-decoration-none ">
            <Link
              to="/Product"
              className="small text-secondary text-decoration-none"
            >
              <p className="small">{t("privacyPolicy")}</p>
            </Link>
            <Link
              to="/Product"
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
            <Link to="" className="small text-secondary text-decoration-none">
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
    </React.Fragment>
  );
}

export default Footer;
