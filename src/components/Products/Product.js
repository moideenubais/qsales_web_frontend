import React, { useState } from "react";
import ReactStars from "react-stars";

function Product(props) {
  const { productName, rating, description, price, productImage } = props;

  const [ratingValue, setRatingValue] = useState(rating || 0);

  const ratingChanged = (newRating) => {
    setRatingValue(newRating);
  };

  return (
    <>
      <div className=" product p-3 rounded mx-1">
        <div className="d-flex justify-content-center">
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}/${productImage}`}
            alt="product"
            className="img-fluid product-image"
          />
        </div>
        <div className="pt-3 product-description">
          <h6
            className="p-0 m-0 mb-1 text-dark "
          >
            { ( productName.length >10 && window.innerWidth < 768)?`${productName?.substring(0,7)}...`:(productName.length >14)?`${productName?.substring(0,11)}...`:productName}
          </h6>
          <p className="p-0 m-0 text-secondary fs-12">{description}</p>
        </div>
        <div className="d-flex flex-column">
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={20}
            color2={"#ffd700"}
            edit={false}
            value={ratingValue}
          />
          <div className="d-flex flex-row mt-1  align-items-center justify-content-between">
            <p className="primary-color p-0 m-0 small">QR {price}</p>
            <div className="d-flex align-items-center justify-content-center">
              {/* Cart icon */}
              {/* <button className="btn-cart d-flex align-items-center justify-content-center">
                <img src="/assets/images/cart.svg" alt="cartIcon" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
