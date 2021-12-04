import React, { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import ReactStars from "react-stars";
import Carousel from "react-elastic-carousel";
import { useForm } from "react-hook-form";
import ProductTabs from "./ProductTabs";
import Address from "./Address";
import FloatingButton from "./whatsappFloatingButton/FloatingButton";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getData, updateData } from "../redux/actions";
import { useHistory } from "react-router";
import { ActionTypes } from "../redux/contants/action-types";
import {
  getCartInLocalStorage,
  isEmptyObj,
  saveCartToLocalStorage,
} from "../heper";
import toast from "react-hot-toast";

function ProductDescription(props) {
  const history = useHistory();
  const { productId } = useParams();
  const {
    getData: propsGetData,
    updateData: propsUpdateData,
    productDetailsReducer,
  } = props;
  const imageBaseUrl = process.env.REACT_APP_IMAGE_URL;

  const {
    product_image_big_url,
    brand,
    rating,
    varients: variants,
    attribute_array,
    colors,
    name: title,
    description,
    modal_name,
  } = productDetailsReducer?.data || {};

  const [ratingValue, setRatingValue] = useState(rating || 0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [attributeArray, setAttributeArray] = useState([]);
  const [selectedImage, setSelectedImage] = useState(
    product_image_big_url ? `${imageBaseUrl}${product_image_big_url[0]}` : ""
  );

  const getPriceAndQuantity = (attributeObject, initail = false) => {
    let returnData = {};
    const attributeData = Object.entries(attributeObject).map(
      ([name, values]) => ({ name, values })
    );

    variants?.forEach((variant) => {
      let variantDep = {};
      if (!isEmptyObj(variant.attribute_value)) {
        variant.attribute_value.forEach(({ name, value }) => {
          variantDep[name] = value;
        });
      }

      if (variant.color && variant.color.length)
        variantDep.colors = variant.color.value;
      if (initail) {
        const isNotMatch = attributeData.some(({ name, values }) => {
          return variantDep[name] && variantDep[name] !== values[0].value;
        });

        if (!isNotMatch) {
          returnData = {
            unit_price: variant.unit_price,
            quantity: variant.quantity,
            variant_id: variant._id,
          };
          attributeData.forEach(({ name, values }) => {
            returnData[name] = values[0].value;
          });
        }
      } else {
        const isNotMatch = attributeData.some(({ name, values }) => {
          if (["quantity", "unit_price"].includes(name)) return false;
          return variantDep[name] && variantDep[name] !== values;
        });
        if (!isNotMatch) {
          returnData = {
            unit_price: variant.unit_price,
            quantity: variant.quantity,
            variant_id: variant._id,
          };
        }
      }
    });

    return isEmptyObj(returnData) ? { unit_price: 0, quantity: 0 } : returnData;
  };

  useEffect(() => {
    propsGetData(ActionTypes.GET_PRODUCT_DETAILS, `/product/${productId}`);
  }, [productId, propsGetData]);

  useEffect(() => {
    let attributeData = [];
    if (attribute_array) {
      attribute_array.forEach(({ name, values }) => {
        attributeData[name] = values;
      });
    }
    if (colors && colors.length) attributeData.colors = colors;
    const initialValue = getPriceAndQuantity(attributeData, true);
    setSelectedAttribute(initialValue);
    setAttributeArray(
      Object.entries(attributeData).map(([name, values]) => ({ name, values }))
    );
  }, [attribute_array, colors]);

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

  const handleOnAttributeChagne = (name, value) => {
    const updateData = { ...selectedAttribute, [name]: value };
    setSelectedAttribute({ ...updateData, ...getPriceAndQuantity(updateData) });
  };

  const addToCart = () => {
    if (selectedQuantity <= 0) return;
    saveCartToLocalStorage({
      product_id: productId,
      varient_id: selectedAttribute.variant_id,
      quantity: selectedQuantity,
    });
    const cart = getCartInLocalStorage();
    propsUpdateData("UPDATE_CART", `/user/cart`, { cart: Object.values(cart) });
    toast.success("Added To Cart");
  };

  return (
    <>
      {productDetailsReducer?.data && (
        <>
          <div className="col-12 d-flex flex-row py-5">
            {/* Product Image */}
            <div className="col-4 p-0 m-0 h-100">
              <ReactImageMagnify
                className="product-magnify"
                style={{ zIndex: 9 }}
                {...{
                  smallImage: {
                    alt: `${title}`,
                    isFluidWidth: true,
                    src: selectedImage,
                    width: 400,
                    height: 400,
                  },
                  largeImage: {
                    src: selectedImage,
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
                      onClick={() =>
                        setSelectedImage(`${imageBaseUrl}${imgUrl}`)
                      }
                    />
                  ))}
                </Carousel>
              </div>
            </div>

            {/* Product Description */}
            <div className="col-5 d-flex flex-column px-5 ">
              <h5>{title} </h5>
              {brand && (
                <p className="small m-0 mt-3">
                  <span className="fw-normal text-dark">Brand :</span>
                  <span className="fw-normal text-black-50 ms-2">{brand}</span>
                </p>
              )}
              {modal_name && (
                <p className="small m-0 mt-2">
                  <span className="fw-normal text-dark">Model Name :</span>
                  <span className="fw-normal text-black-50 ms-2">
                    {modal_name}
                  </span>
                </p>
              )}
              <div className="d-flex flex-row align-items-center mt-1 ">
                <p className="small fw-normal text-dark me-2">Ratings :</p>
                <ReactStars
                  count={5}
                  value={ratingValue}
                  edit={false}
                  onChange={ratingChanged}
                  size={20}
                  color2={"#ffd700"}
                />
              </div>

              {attributeArray.map(({ name, values }) => (
                <div className="d-flex">
                  <p className="small fw-normal text-dark mb-1">{name} :</p>
                  <select
                    className="py-1 px-3 form-select"
                    aria-label="Default select example"
                    onChange={(e) =>
                      handleOnAttributeChagne(name, e.target.value)
                    }
                    value={selectedAttribute[name]}
                  >
                    {values.map(({ value: v, name: n }) => (
                      <option value={v}>{n || v}</option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="d-flex flex-row align-items-start justify-content-between mt-3">
                <div className="">
                  <p className="small fw-normal mb-1">Now at</p>
                  <h5 className="primary-color p-0 m-0 ">
                    ₹ {selectedAttribute.unit_price}
                  </h5>
                </div>

                <div className="">
                  {selectedAttribute.quantity > 0 ? (
                    <>
                      <p className="small fw-normal text-dark mb-1">Quantity</p>
                      <select
                        className="py-1 px-3 form-select"
                        aria-label="Default select example"
                        onChange={(e) => setSelectedQuantity(e.target.value)}
                        value={selectedQuantity}
                      >
                        <>
                          {[
                            ...Array(
                              parseInt(selectedAttribute.quantity)
                            ).keys(),
                          ].map((v) => (
                            <option value={v + 1}>{v + 1}</option>
                          ))}
                        </>
                      </select>
                    </>
                  ) : (
                    <p className="small fw-normal text-black-50">
                      Out of Stock
                    </p>
                  )}
                </div>
              </div>
              <hr className="my-4" />
              <div className="d-flex flex-row ">
                <button
                  className="btn btn-qs-primary w-100 p-2 small "
                  type="button"
                  disabled={selectedAttribute.quantity <= 0}
                  onClick={addToCart}
                >
                  {selectedAttribute.quantity > 0
                    ? "Add To Cart"
                    : " Out of Stock"}
                </button>
              </div>
            </div>

            {/* Checkout Section */}
            <div className="col-3 border p-3 rounded-3 card">
              <h6 className="">Checkout</h6>
              <hr className="my-3" />
              <Address />
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
                    onClick={() => {}}
                  >
                    BUY NOW
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
  updateData,
  getData,
})(ProductDescription);
