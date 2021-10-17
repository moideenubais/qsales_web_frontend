import React, { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import ReactStars from "react-stars";
import Carousel from "react-elastic-carousel";
import { useForm } from "react-hook-form";
import ProductTabs from "./ProductTabs";
import FloatingButton from "./whatsappFloatingButton/FloatingButton";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from "../redux/actions";
import { ActionTypes } from "../redux/contants/action-types";

function ProductDescription(props) {
  const { productId } = useParams();
  const { getData: propsGetData, productDetailsReducer } = props;
  const imageBaseUrl = process.env.REACT_APP_IMAGE_URL;

  const {
    product_image_small_url,
    product_image_big_url,
    resourceBundle,
    rating,
    prices,
    attribute_value_object,
    description,
  } = productDetailsReducer?.data || {};

  const { name: title } = resourceBundle?.[0] || {};
  const { unit_price, quantity } = prices?.[0] || {};

  const [ratingValue, setRatingValue] = useState(rating || 0);

  useEffect(() => {
    propsGetData(ActionTypes.GET_PRODUCT_DETAILS, `/product/${productId}`);
  }, [propsGetData, productId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const ratingChanged = (newRating) => {
    setRatingValue(newRating);
  };

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  return (
    <>
      {productDetailsReducer?.data && (
        <>
          <div className="col-12 d-flex flex-row py-5">
            {console.log(productDetailsReducer)}
            {/* Product Image */}
            <div className="col-4 p-0 m-0 h-100">
              <ReactImageMagnify
                className="product-magnify"
                {...{
                  smallImage: {
                    alt: `${title}`,
                    isFluidWidth: true,
                    src: `${imageBaseUrl}${product_image_small_url}`,
                    width: 400,
                    height: 400,
                  },
                  largeImage: {
                    src: `${imageBaseUrl}${product_image_big_url[0]}`,
                    alt: `${title}`,
                    width: 1200,
                    height: 1200,
                  },
                  shouldUsePositiveSpaceLens: true,
                }}
              />
              <div className="d-flex flex-row align-items-center py-4">
                <Carousel
                  itemsToShow={3}
                  enableAutoPlay={false}
                  itemPadding={[80, 80]}
                  pagination={false}
                  easing="cubic-bezier(1,.15,.55,1.54)"
                  tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
                  transitionMs={700}
                  className="px-0"
                >
                  {product_image_big_url.map((imgUrl) => (
                    <img
                      src={`${imageBaseUrl}${imgUrl}`}
                      height="80"
                      width="80"
                      alt=""
                      className="rounded-3 border"
                    />
                  ))}
                </Carousel>
              </div>
            </div>

            {/* Product Description */}
            <div className="col-5 d-flex flex-column px-5 ">
              <h5>{title} </h5>
              <p className="small m-0 mt-3">
                <span className="fw-normal text-dark">Brand :</span>
                <span className="fw-normal text-black-50 ms-2">Clickon</span>
              </p>
              <p className="small m-0 mt-2">
                <span className="fw-normal text-dark">Model Number :</span>
                <span className="fw-normal text-black-50 ms-2">JJ-85004</span>
              </p>
              <div className="d-flex flex-row align-items-center mt-1 ">
                <p className="small fw-normal text-dark me-2">Ratings :</p>
                <ReactStars
                  style={{ zIndex: -19 }}
                  count={5}
                  value={ratingValue}
                  onChange={ratingChanged}
                  size={20}
                  color2={"#ffd700"}
                />
              </div>

              {attribute_value_object && (
                <p className="small m-0 mt-2">
                  <span className="fw-normal text-dark">Size :</span>
                  <span className="fw-normal text-black-50 ms-2">
                    attribute_value_object
                  </span>
                </p>
              )}

              <div className="d-flex flex-row align-items-start justify-content-between mt-3">
                <div className="">
                  <p className="small fw-normal mb-1">Now at</p>
                  <h5 className="primary-color p-0 m-0 ">₹ {unit_price}</h5>
                </div>

                <div className="">
                  <p className="small fw-normal text-dark mb-1">Quantity</p>
                  <select
                    className="py-1 px-3 form-select"
                    aria-label="Default select example"
                  >
                    {quantity > 0 && (
                      <>
                        <option selected>1</option>
                        {[...Array(parseInt(quantity - 1)).keys()].map((v) => (
                          <option value={v + 2}>{v + 2}</option>
                        ))}
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <p className="small  d-flex flex-column">
                  <span className="fw-normal mb-1">About Product</span>
                  <span className="small text-black-50">
                    Free shipping when you spend AED 100 and above on express
                    items
                  </span>
                </p>
              </div>

              <hr className="my-4" />
              <div className="d-flex flex-row ">
                <button
                  className="btn btn-qs-primary w-100 p-2 small "
                  type="submit"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            {/* Checkout Section */}
            <div className="col-3 border p-3 rounded-3 card">
              <h6 className="">Checkout</h6>
              <hr className="my-3" />
              <p className="small  d-flex flex-column">
                <span className="fw-normal mb-1">TRUSTED SHIPPING</span>
                <span className="small text-black-50">
                  Free shipping when you spend AED 100 and above on express
                  items
                </span>
              </p>
              <div className="mt-3">
                <p className="small my-2 d-flex flex-column">
                  <span className="fw-normal mb-1">ADDRESS</span>
                  <span className="small text-black-50">
                    Near Firdous Hotel, Ayal Nasr Street, Deira
                  </span>
                </p>
                <button className="btn btn-dark btn-sm p-1 px-2 small my-2">
                  Change Address
                </button>
              </div>
              <hr className="my-3" />
              <div className="mb-2">
                <p className="fw-normal mb-1">Payments</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="d-flex flex-row align-items-center mb-1">
                    <input
                      {...register("payment-method", { required: true })}
                      type="radio"
                      value="Cash on delivery"
                    />
                    <p className="small ms-2">Cash on delivery</p>
                  </div>

                  <div className="d-flex flex-row align-items-center">
                    <input
                      {...register("payment-method", { required: true })}
                      type="radio"
                      value="Net Banking"
                    />
                    <p className="small ms-2">Net banking</p>
                  </div>

                  <button
                    className="btn btn-qs-primary w-100 p-2 small mt-3"
                    type="submit"
                  >
                    CHECKOUT
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Product tabs */}

          <div className="col-12 my-2">
            <ProductTabs description={description} />
          </div>
          <FloatingButton />
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  productDetailsReducer: state.getProductsReducer,
});

export default connect(mapStateToProps, {
  getData,
})(ProductDescription);
