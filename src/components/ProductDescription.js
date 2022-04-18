import React, { useEffect, useLayoutEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import ReactImageMagnify from "react-image-magnify";
import ReactStars from "react-stars";
import Carousel from "react-elastic-carousel";
import ProductTabs from "./ProductTabs";
import Address from "./Address";
import FloatingButton from "./whatsappFloatingButton/FloatingButton";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getData, updateData, createData } from "../redux/actions";
import { ActionTypes } from "../redux/contants/action-types";
import {
  getCartInLocalStorage,
  getDiscountedPrice,
  getParamValue,
  isEmptyObj,
  saveCartToLocalStorage,
} from "../heper";
import toast from "react-hot-toast";
import { useCartContext } from "../context/cartContext";
import Strings from "../Constants";
import Product from "./Products/Product";
import axios from "axios";
import ReviewForm from "./ReviewForm";

function ProductDescription(props) {
  const history = useHistory();
  const location = useLocation();
  const { productUrl } = useParams();
  const productId = productUrl.slice(productUrl.indexOf("-product-id-") + 12);
  const {
    getData: propsGetData,
    updateData: propsUpdateData,
    createData: propsCreateData,
    productDetailsReducer,
    user,
  } = props;

  const imageBaseUrl = process.env.REACT_APP_IMAGE_URL;

  const { setCartInLocal } = useCartContext();

  const [ratingValue, setRatingValue] = useState(0);
  const [productDetails, setProductDetails] = useState({});
  const [show, setShow] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [initialLoading, setInitialLoading] = useState(false);
  const [attributeArray, setAttributeArray] = useState([]);
  const [orderData, setOrderData] = useState({
    products: [], //An array of objects
    customer_id: user?._id,
    customer_name: user?.name,
    mobile: user?.mobile,
    shipping_address: { _id: undefined },
    delivery_note: "This is for you", // [OPTIONAL]
    delivery_time: "Any time",
    payment_status: "unpaid",
    payment_method: "cod", // one of ["card","cod"]
  });
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    propsGetData(ActionTypes.GET_PRODUCT_DETAILS, `/product/${productId}`);
  }, [productId, propsGetData]);

  useEffect(() => {
    const data = productDetailsReducer?.data;
    if (!data || data._id !== productId) return setInitialLoading(true);
    setInitialLoading(false);
    setProductDetails(data || {});
    setSelectedImage(
      data.product_image_big_url ? `${data.product_image_big_url[0]}` : ""
    );
    setRatingValue(data.rating);

    return () => {
      setProductDetails({});
      setSelectedImage("");
      setRatingValue(0);
    };
  }, [productDetailsReducer, imageBaseUrl, productId]);

  useEffect(() => {
    if (user) {
      setOrderData({
        ...orderData,
        customer_id: user._id,
        customer_name: user.name,
        mobile: user.mobile,
      });
    }
  }, [user]);
  useEffect(() => {
    setOrderData({
      ...orderData,
      products: [
        {
          product_id: productId,
          varient_id: selectedAttribute.variant_id,
          quantity: selectedQuantity,
        },
      ],
    });
  }, [selectedAttribute, selectedQuantity]);

  const getPriceAndQuantity = (attributeObject, initail = false,variant_id) => {
    console.log(variant_id)
    let returnData = {};
    const attributeData = Object.entries(attributeObject).map(
      ([name, values]) => ({ name, values })
    );
    productDetails.varients?.forEach((variant) => {
      const firstVarient = productDetails.varients[0];
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
            unit_price: firstVarient.unit_price,
            quantity: firstVarient.quantity,
            variant_id: variant_id,
            discount_type: firstVarient.discount_type,
            discount_amount: firstVarient.discount_amount,
            flash: productDetails.flash,
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
            variant_id: variant_id,
            discount_type: variant.discount_type,
            discount_amount: variant.discount_amount,
            flash: productDetails.flash,
          };
        }
      }
    });

    return isEmptyObj(returnData) ? { unit_price: 0, quantity: 0 } : returnData;
  };

  useEffect(() => {
    const { attribute_array, colors, varients } = productDetails;
    let attributeData = [];
    if (attribute_array) {
      attribute_array.forEach(({ name, values }) => {
        attributeData[name] = values;
      });
    }
    if (colors && colors.length) attributeData.colors = colors;
    const initialValue = getPriceAndQuantity(attributeData, true,varients&&varients[0]?._id);
    setSelectedAttribute(initialValue);

    setAttributeArray(
      Object.entries(attributeData).map(([name, values]) => ({ name, values }))
    );
  }, [productDetails]);
  const ratingChanged = (newRating) => {
    setRatingValue(newRating);
  };

  const handleOnAttributeChagne = (name, value) => {
    var found_names = productDetails?.varients?.filter(function (obj) {
      return (obj.color.name === value);
    });
    const updateData = { [name]: value, 'variant_id': found_names[0]?._id };
    setSelectedAttribute({
      ...updateData,
      ...getPriceAndQuantity(updateData,null ,found_names[0]?._id),
    });
  };

  const addToCart = (isBuyNow = false) => {
    if (selectedQuantity <= 0) return;
    saveCartToLocalStorage({
      product_id: productId,
      varient_id: selectedAttribute.variant_id,
      quantity: parseInt(selectedQuantity),
    });
    const cart = getCartInLocalStorage();
    setCartInLocal(cart);
    if (!user?._id) {
      toast.success("Added To Cart", {
        className: "my-toast",
      });

      if (isBuyNow) {
        history.push("/checkout");
      }
      return;
    }

    propsUpdateData("UPDATE_CART", `/user/cart`, {
      cart: Object.values(cart),
    }).then((res) => {
      if (!res.error) {
        toast.success("Added To Cart", {
          className: "my-toast",
        });
        if (isBuyNow) {
          history.push("/checkout");
        }
      } else
        toast.error("Something went wrong", {
          className: "my-toast",
        });
    });
  };

  const [similarProdcuts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (productDetails?.category_id) {
      axios
        .get(
          `/product?category_id=${productDetails?.category_id}&limit=4&user_type=user`
        )
        .then((res) => {
          setSimilarProducts(res?.data?.products || []);
        });
    }
  }, [productDetails?.category_id]);
  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 3, itemsToScroll: 2, pagination: false },
    // { width: 850, itemsToShow: 5 },
    // { width: 1150, itemsToShow: 6, itemsToScroll: 2 },
    // { width: 1450, itemsToShow: 6 },
    // { width: 1750, itemsToShow: 7 },
  ];
  // useEffect(() => {
  //   document?.getElementById("navigation")?.scrollIntoView();
  // }, [location]);

  // useLayoutEffect(() => {
  //   if (location?.state?.order && !initialLoading) {
  //     document.getElementById("review-form").scrollIntoView();
  //   }
  // }, [location, initialLoading]);
  return (
    <>
      {initialLoading && (
        <div
          style={{
            height: "65vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="spinner" />
        </div>
      )}
      {productDetails && !initialLoading && (
        <>
          <div className="col-12 py-5">
            {/* Product Image */}
            <div className="row">
              <div className="col-md-6 col-sm-12 p-0 m-0 h-100">
                <ReactImageMagnify
                  className="product-magnify"
                  style={{ zIndex: 9 }}
                  {...{
                    smallImage: {
                      alt: `${productDetails.title}`,
                      // isFluidWidth: true,
                      src: selectedImage,
                      width: 400,
                      height: 400,
                    },
                    largeImage: {
                      src: selectedImage,
                      alt: `${productDetails.title}`,
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
                    {productDetails.product_image_big_url?.map((imgUrl) => (
                      <img
                        src={`${imgUrl}`}
                        height="80"
                        width="80"
                        alt=""
                        className="rounded-3 border"
                        onClick={() => setSelectedImage(`${imgUrl}`)}
                      />
                    ))}
                  </Carousel>
                </div>
              </div>

              {/* Product Description */}
              <div className="col-md-6 col-sm-12 d-flex flex-column px-5 ">
                <h5>{productDetails.i18nResourceBundle?.name} </h5>
                {/* {brand && (
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
              )} */}
                <div className="d-flex flex-row align-items-center mt-1 ">
                  <p className="medium fw-normal text-dark me-2">Ratings :</p>
                  {/* <ReactStars
                    count={5}
                    value={ratingValue}
                    edit={false}
                    onChange={ratingChanged}
                    size={20}
                    color2={"#ffd700"}
                  /> */}
                </div>


                {/* const { name, values } = item; */}

                <div className="d-flex mb-2 mt-2 justify-content-between">
                  <p className="medium fw-normal text-dark me-5">
                    colors :
                  </p>
                  <select
                    className="py-2 px-3 form-select"
                    style={{ width: "60%" }}
                    aria-label="Default select example"
                    onChange={(e) =>
                      handleOnAttributeChagne('colors', e.target.value)
                    }
                    value={selectedAttribute['colors']}
                  >
                    {productDetails?.varients?.map((res) => (
                      <option value={res?.color?.name}>{res?.color?.name}</option>
                    ))}
                  </select>
                </div>
                {/* );
                })} */}

                <div className="d-flex flex-row align-items-start justify-content-between mt-3">
                  <div className="">
                    <p className="medium fw-normal mb-1">Now at</p>
                    {selectedAttribute?.flash?.discount_type ||
                      selectedAttribute?.discount_type ? (
                      <h5 className="primary-color p-0 m-0 ">
                        QR{" "}
                        {getDiscountedPrice(
                          selectedAttribute?.flash?.discount_type ||
                          selectedAttribute?.discount_type,
                          selectedAttribute?.flash?.discount_amount ||
                          selectedAttribute?.discount_amount,
                          selectedAttribute.unit_price
                        )}
                        <small>
                          &nbsp;&nbsp;
                          <span className="text-muted ">
                            <s>QR {selectedAttribute.unit_price}</s>
                          </span>
                          <span className="text-success">
                            {" "}
                            {getParamValue(
                              selectedAttribute?.flash?.discount_type,
                              selectedAttribute?.discount_type
                            ) == "flat"
                              ? "QR "
                              : ""}
                            {selectedAttribute?.flash?.discount_amount ||
                              selectedAttribute?.discount_amount}
                            {getParamValue(
                              selectedAttribute?.flash?.discount_type,
                              selectedAttribute?.discount_type
                            ) == "flat"
                              ? ""
                              : "%"}{" "}
                            off
                          </span>
                        </small>
                      </h5>
                    ) : (
                      <h5 className="primary-color p-0 m-0 ">
                        QR {selectedAttribute.unit_price}
                      </h5>
                    )}
                    {/* <h5 className="primary-color p-0 m-0 ">
                      QR {selectedAttribute.unit_price}
                    </h5> */}
                  </div>

                  <div className="">
                    {selectedAttribute.quantity > 0 ? (
                      <>
                        <p className="medium fw-normal text-dark mb-1">
                          Quantity
                        </p>
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
                      <p className="medium fw-normal text-black-50">
                        Out of Stock
                      </p>
                    )}
                  </div>
                </div>
                <p className="">
                  <span className="text-muted">Shipping: </span>
                  <span className="text-success">
                    {productDetails.shipping_config === "flat_rate"
                      ? `QR ${productDetails?.product_quantity_multiply
                        ? productDetails.shipping_cost * selectedQuantity
                        : productDetails.shipping_cost
                      }`
                      : "Free Delivery"}
                  </span>
                </p>
                {productDetails?.minimum_purchase_quantity && (
                  <p>
                    <span className="text-muted">Minimum Purchase: </span>
                    <span className="text-success">
                      {productDetails?.minimum_purchase_quantity}
                    </span>
                  </p>
                )}

                <hr className="my-4" />
                <div className="d-flex flex-row ">
                  <button
                    className="btn btn-qs-primary w-100 p-2 small "
                    type="button"
                    disabled={selectedAttribute.quantity <= 0}
                    onClick={() => addToCart(false)}
                  >
                    {selectedAttribute.quantity > 0
                      ? "Add To Cart"
                      : " Out of Stock"}
                  </button>
                  <button
                    className="btn btn-qs-primary w-100 p-2 ms-1 small "
                    style={{ backgroundColor: "#45904e" }}
                    type="button"
                    disabled={selectedAttribute.quantity <= 0}
                    onClick={() =>
                      window
                        .open(
                          `${Strings.whatsappUrl}&text=${window.location.href}`,
                          "_blank"
                        )
                        .focus()
                    }
                  >
                    {selectedAttribute.quantity > 0
                      ? "Order By WhatsApp"
                      : " Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
            {/* Checkout Section */}
            {/* <div className="col-3 border p-3 rounded-3 card">
              <h6 className="">Checkout</h6>
              <hr className="my-3" />
              <div className="mb-2">
                <p className="fw-normal mb-1">User Details</p>
                <div className="">
                  <p className="small mb-1">Name</p>
                  <input
                    type="text"
                    name="customer_name"
                    className="w-100 mb-2"
                    value={orderData.customer_name}
                    onChange={({ target }) => {
                      setOrderData({
                        ...orderData,
                        customer_name: target.value,
                      });
                    }}
                  />
                  {errors.customer_name && <p>{errors.customer_name}</p>}
                </div>
                <div className="">
                  <p className="small mb-1">Mobile</p>
                  <input
                    name="mobile"
                    className="w-100"
                    value={orderData.mobile}
                    onChange={({ target }) => {
                      setOrderData({
                        ...orderData,
                        mobile: target.value,
                      });
                    }}
                  />
                  {errors.mobile && <p>{errors.mobile}</p>}
                </div>
              </div>
              <hr className="my-3" />
              <Address
                onChange={(address) => {
                  setOrderData({ ...orderData, address });
                }}
              />
              <hr className="my-3" />
              <div className="mb-2">
                <p className="fw-normal mb-1">Payments</p>
                <div className="d-flex flex-row align-items-center mb-1">
                  <input
                    type="radio"
                    value="cod"
                    checked={orderData.payment_method === "cod"}
                    onChange={() => {
                      setOrderData({ ...orderData, payment_method: "cod" });
                    }}
                  />
                  <p className="small ms-2">Cash on delivery</p>
                </div>

                <div className="d-flex flex-row align-items-center">
                  <input
                    type="radio"
                    value="card"
                    checked={orderData.payment_method === "card"}
                    onChange={() => {
                      setOrderData({ ...orderData, payment_method: "card" });
                    }}
                  />
                  <p className="small ms-2">Net banking</p>
                </div>

                <button
                  className="btn btn-qs-primary w-100 p-2 small mt-3"
                  type="submit"
                  onClick={() => {
                    const errorsData = {};
                    if (!orderData.customer_name) {
                      errorsData.customer_name = "Name is required";
                    }
                    if (!orderData.mobile) {
                      errorsData.mobile = "mobile is required";
                    } else if (orderData.mobile.length !== 10) {
                      errorsData.mobile =
                        "Mobile length should be 10 characters";
                    }
                    if (Object.keys(errorsData).length) {
                      setErrors(errorsData);
                      return;
                    }
                    setShow(true);
                  }}
                >
                  BUY NOW
                </button>
              </div>
            </div> */}
          </div>
          {/* Product tabs */}
          <div className="col-12 my-2">
            <ProductTabs
              description={productDetails.i18nResourceBundle?.description}
              product_id={productId}
              warranty={productDetails.i18nResourceBundle?.warranty}
              policy={productDetails.i18nResourceBundle?.return_policy}
            />
          </div>
          <div id="review-form" className="w-100">
            {location?.state?.order && (
              <ReviewForm
                order={location?.state?.order}
                productId={productId}
              />
            )}
          </div>

          {similarProdcuts.length > 0 && (
            <div className="py-4 bg-white w-100">
              <hr />
              {/* Title of Product Container */}
              <div className="py-2">
                <h4 className="p-0 m-0">Similar Products</h4>
              </div>
              {/* List of product */}
              <div className="d-flex flex-row justify-content-between flex-wrap flex-md-nowrap card-group">
                <Carousel breakPoints={breakPoints} pagination={false}>
                  {similarProdcuts.map(
                    (
                      {
                        name,
                        rating,
                        description,
                        price,
                        product_image_small_url,
                        _id,
                        flash,
                      },
                      index
                    ) => {
                      return (
                        <Product
                          _id={_id}
                          key={index}
                          productName={name}
                          rating={rating}
                          description={description}
                          productImage={product_image_small_url}
                          price={price?.unit_price}
                          discountAmount={
                            flash?.discount_amount || price?.discount_amount
                          }
                          discountType={
                            flash?.discount_type || price?.discount_type
                          }
                        // classes="product-card-extention"
                        />
                      );
                    }
                  )}
                </Carousel>
              </div>
            </div>
          )}

          <FloatingButton />
        </>
      )}
      {show && (
        <div className="popup">
          <div
            style={{
              borderRadius: "5px",
              backgroundColor: "white",
            }}
            className="align-items-center p-5 justify-content-center absolute"
          >
            Do you want to place the order?
            <div className="d-flex align-items-center justify-content-center absolute gap-2">
              <button
                className="btn btn-qs-primary w-100 p-2 small mt-3"
                type="submit"
                onClick={() => {
                  propsCreateData("PLACE_ORDER", "order", orderData).then(
                    (res) => {
                      if (res.error) toast.error("Error while creating order");
                      else {
                        toast.success("Order placed", {
                          className: "my-toast",
                        });
                        setShow(false);
                      }
                    }
                  );
                }}
              >
                CONFIRM
              </button>
              <button
                className="btn btn-qs-secondary  w-100 p-2 small mt-3"
                type="submit"
                onClick={() => {
                  setShow(false);
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  ...state.authReducer,
  productDetailsReducer: state.getProductReducer,
});

export default connect(mapStateToProps, {
  updateData,
  getData,
  createData,
})(ProductDescription);
