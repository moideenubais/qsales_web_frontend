import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactStars from "react-stars";

function Product(props) {
  const {
    _id,
    productName,
    rating,
    description,
    price,
    productImage,
    discountType,
    discountAmount,
    classes = "",
  } = props;

  const history = useHistory();

  const [ratingValue, setRatingValue] = useState(rating || 0);

  const ratingChanged = (newRating) => {
    setRatingValue(newRating);
  };

  return (
    <>
      <Link
        key={_id}
        className={`text-decoration-none h-100 product mx-1 ${classes}`}
        onClick={(e) => {
          history.push({
            pathname: `/product/${
              // productName.toLowerCase().split(" ").join("-") +
              productName.toLowerCase().split(" ").join("-") +
              "-product-id-" +
              _id
            }`,
            query: { id: _id },
          });
        }}
      >
        <div className="d-flex justify-content-center">
          <img
            src={`${productImage}`}
            alt="product"
            className="card-img-top img-fluid product-image"
          />
        </div>
        <div
          className="p-2 d-flex  flex-column "
          style={{
            height: window.innerWidth < 768 ? "inherit" : "fit-content",
          }}
        >
          <div className=" product-description">
            <h6
              className={`product-title p-0 m-0 mb-1 text-dark card-title ${
                window.innerWidth > 768 ? "" : ""
              }`}
            >
              {productName.length > 10 && window.innerWidth < 768
                ? `${productName?.substring(0, 25)}${
                    productName.length > 25 ? "..." : ""
                  }`
                : `${productName?.substring(0, 40)}${
                    productName.length > 40 ? "..." : ""
                  }`}
            </h6>
            <p className="p-0 m-0 text-secondary fs-12">{description}</p>
          </div>
          <div className="d-flex flex-column">
            {/* <ReactStars
              className={"rating"}
              count={5}
              onChange={ratingChanged}
              size={20}
              color2={"#ffd700"}
              edit={false}
              value={ratingValue}
            /> */}
            <div className="mt-1  align-items-center justify-content-between">
              {discountType && discountAmount ? (
                <>
                  <p className="primary-color p-0 m-0 small d-flex align-items-center">
                    <strong>
                      QR{" "}
                      {parseFloat(
                        discountType == "flat"
                          ? price - discountAmount
                          : ((100 - parseFloat(discountAmount)) / 100) *
                              parseFloat(price)
                      ).toFixed(2)}
                      &nbsp;&nbsp;
                    </strong>
                  </p>
                  <div style={{ whiteSpace: "nowrap" }}>
                    <small className="extra-small">
                      <span className="text-muted ">
                        <s>QR {price}</s>
                      </span>
                      <span className="text-success">
                        {" "}
                        {discountType == "flat" ? "QR " : ""}
                        {discountAmount}
                        {discountType == "flat" ? "" : "%"} off
                      </span>
                    </small>
                  </div>
                </>
              ) : (
                <p className="primary-color p-0 m-0 small">
                  <strong>QR {price}</strong>
                </p>
              )}
              {/* <div className="d-flex align-items-center justify-content-center">
              {/* Cart icon */}
              {/* <button className="btn-cart d-flex align-items-center justify-content-center">
                <img src="/assets/images/cart.svg" alt="cartIcon" />
              </button> 
           </div> */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Product;
