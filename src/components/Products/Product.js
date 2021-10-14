import React from "react";
import ReactStars from "react-stars";

function Product(props) {
  const { productName, ratings, description, price, productImage } = props;
  const [data, setData] = React.useState(props.items);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <React.Fragment>
      <div className=" product p-3 rounded mx-1">
        <img
          src={
            "http://ec2-3-133-125-119.us-east-2.compute.amazonaws.com/" +
            productImage
          }
          className="img-fluid product-image"
        />
        <div className="pt-3 product-description">
          <h6 className="p-0 m-0 mb-1 text-dark">{productName}</h6>
          <p className="p-0 m-0 text-secondary fs-12">4 Seater dinning set</p>
        </div>
        <div className="d-flex flex-column">
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={20}
            color2={"#ffd700"}
            rating={ratings}
          />
          <div className="d-flex flex-row mt-1  align-items-center justify-content-between">
            <p className="primary-color p-0 m-0 small">₹ {price}</p>
            <div className="d-flex align-items-center justify-content-center">
              {/* Cart icon */}
              <button className="btn-cart d-flex align-items-center justify-content-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 18.066 17.313"
                >
                  <g
                    id="Icon_feather-shopping-cart"
                    data-name="Icon feather-shopping-cart"
                    transform="translate(-0.75 -0.75)"
                  >
                    <path
                      id="Path_4"
                      data-name="Path 4"
                      d="M13.506,30.753A.753.753,0,1,1,12.753,30,.753.753,0,0,1,13.506,30.753Z"
                      transform="translate(-5.229 -14.193)"
                      fill="none"
                      stroke="#8f1d3f"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_5"
                      data-name="Path 5"
                      d="M30.006,30.753A.753.753,0,1,1,29.253,30,.753.753,0,0,1,30.006,30.753Z"
                      transform="translate(-13.446 -14.193)"
                      fill="none"
                      stroke="#8f1d3f"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      id="Path_6"
                      data-name="Path 6"
                      d="M1.5,1.5H4.512L6.53,11.583A1.506,1.506,0,0,0,8.036,12.8h7.319a1.506,1.506,0,0,0,1.506-1.212l1.2-6.318H5.265"
                      fill="none"
                      stroke="#8f1d3f"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Product;
