import React, { useState } from "react";
import ReactStars from "react-stars";

function Product(props) {
  const { productName, rating, description, price, productImage, discountType, discountAmount } = props;

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
            className="card-img-top img-fluid product-image"
          />
        </div>
        <div className="pt-3 product-description">
          <h6
            className={`p-0 m-0 mb-1 text-dark card-title ${window.innerWidth > 768 ?"text-clip":""}`}
          >
          { ( productName.length >10 && window.innerWidth < 768)?`${productName?.substring(0,7)}...`:productName}
          </h6>
          <p className="p-0 m-0 text-secondary fs-12">{description}</p>
        </div>
        <div className="d-flex flex-column">
          <ReactStars
            className={"rating"}
            count={5}
            onChange={ratingChanged}
            size={20}
            color2={"#ffd700"}
            edit={false}
            value={ratingValue}
          />
          <div className="d-flex flex-row mt-1  align-items-center justify-content-between">
            {
              discountType ? 
              <p className="primary-color p-0 m-0 small d-flex align-items-center">
              <strong>
                QR {parseFloat(discountType=='flat'?price-discountAmount:(((100-parseFloat(discountAmount))/100)*parseFloat(price))).toFixed(2)} 
              </strong>
              <small className="extra-small"> 
               &nbsp;&nbsp;(<span className="text-muted "><s>QR {price}</s></span>
                 <span className="text-success"> {(discountType=='flat')?'QR ':''}{discountAmount}{(discountType=='flat')?'':'%'} off</span>)
              </small>
            </p>:
            <p className="primary-color p-0 m-0 small">
            <strong>QR {price}</strong>
            </p>
            }
            {/* <div className="d-flex align-items-center justify-content-center">
              {/* Cart icon */}
              {/* <button className="btn-cart d-flex align-items-center justify-content-center">
                <img src="/assets/images/cart.svg" alt="cartIcon" />
              </button> 
           </div> */}
          </div>
        </div>
      </div> 
    </>
  );
}

export default Product;
