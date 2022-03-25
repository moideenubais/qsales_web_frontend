import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  getData,
  updateData,
  createData,
  deleteData,
} from "../../redux/actions";
import { logoutUser } from "../../redux/actions/auth.js";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import { getCartInLocalStorage, getDiscountedPrice } from "../../heper";
import { useCartContext } from "../../context/cartContext";
import SignIn from "../../components/Auth/SignIn";
import SignUp from "../../components/Auth/SignUp";
import ForgetPassword from "../../components/Auth//ForgetPassword";
import {
  CheckoutPagePriceWrapper,
  CheckoutPageSmallWrapper,
} from "../Cart/styles";
import useMediaQuery from "../../custom-hooks/useMediaQuery";

const ADDRESS_FIELDS = [
  { label: "Building Number", name: "building_no" },
  { label: "Street Number", name: "street_no" },
  { label: "Zone Number", name: "zone_no" },
];

function CheckoutSteps(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    user,
    isAuthenticated,
    updateData: propsUpdateData,
    getData: propsGetData,
    createData: propsCreateData,
    deleteData: propsDeleteData,
    userData,
  } = props;
  ///Login Logout States
  const [showModal, setShowModal] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [forgotPwd, setForgotPwd] = useState(false);
  ////
  const { setCartInLocal } = useCartContext();
  const { register, handleSubmit } = useForm();
  const [result, setResult] = React.useState("");
  const [addresses, setAddresses] = React.useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = React.useState(0);
  const [expandedKey, setExpandedKey] = React.useState("0");
  const [editable, setEditable] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState("cod");
  const [errors, setErrors] = React.useState({});
  const [cartItems, setCartItems] = useState([]);
  const [disablePlaceOrder, setDisablePlaceOrder] = useState(false);
  const placeOrderButtonRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 500px)");
  const [orderContent, setOrderContent] = React.useState({
    delivery_note: "", // [OPTIONAL]
    delivery_time: "Any time",
  });

  const [location, setLocation] = useState({ latitude: "", longitude: "" });

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocation);
    }
  };
  const handleLocation = (postion) => {
    setLocation({
      latitude: postion.coords.latitude,
      longitude: postion.coords.longitude,
    });
    toast.success("Current Location Added", {
      className: "my-toast",
    });
  };
  const [unAuthenticatedUser, setUnAuthenticatedUser] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address: {
      building_no: "",
      street_no: "",
      zone_no: "",
    },
    delivery_note: "",
    delivery_time: "Any time",
    payment_method: paymentMethod,
  });

  const onSubmit = (data) => setResult(JSON.stringify(data));

  const getCartItems = () => {
    propsGetData("GET_CARTS", "user/cart").then((res) => {
      if (res.error) return;
      setCartItems(res.payload.data.cart);
    });
  };
  const getAddressData = () => {
    propsGetData("GET_USER", `user/${user?._id}`).then((res) => {
      if (!res.error) setAddresses(res.payload.data.address);
    });
  };

  useEffect(() => {
    getAddressData();

    if (!user?._id) {
      const cart = getCartInLocalStorage();
      propsCreateData("GET_CART_DETAILS", "user/cartDetails", {
        cart: Object.values(cart),
      }).then((res) => {
        if (res.error) return;
        setCartItems(res.payload.data.cart);
      });
    } else {
      getCartItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      setOrderContent({
        ...orderContent,
        customer_name: user.name || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  const emptyAddress = (val, index) => {
    if (val == null || !Object.keys(val).length) return true;
    const addressData = userData.data.address;
    if (JSON.stringify(val) === JSON.stringify(addressData[index])) {
      return true;
    }
    return ADDRESS_FIELDS.some(({ name }) => !val[name]);
  };

  const deletAddress = (index) => {
    setAddresses(addresses.filter((_, i) => index !== i));
    const deleteId = addresses[index]?._id;

    if (selectedAddressIndex === index) setSelectedAddressIndex(0);
    if (!deleteId) return;

    propsDeleteData(
      "DELETE_ADDRESS",
      `user/${user._id}/address/${deleteId}`
    ).then((res) => {
      if (!res.error) {
        getAddressData();
      } else
        toast.error("Error on deleting address", {
          className: "my-toast",
        });
    });
  };

  const updateAddress = (index) => {
    if (emptyAddress(addresses[index], index)) return;
    propsUpdateData(
      "UPDATE_ADDRESS",
      `user/${user._id}/address`,
      addresses[index]
    ).then((res) => {
      if (!res.error) {
        toast.success("Address updated", {
          className: "my-toast",
        });
        setSelectedAddressIndex(index);
        getAddressData();
      } else
        toast.error("Error on updating address", {
          className: "my-toast",
        });
    });
  };

  const calcSubTotal = () => {
    let subTotal = 0;
    cartItems.forEach((item) => {
      subTotal +=
        getDiscountedPrice(
          item.product?.flash?.discount_type ||
            item.product?.varient?.discount_type,
          item.product?.flash?.discount_amount ||
            item.product?.varient?.discount_amount,
          item.product?.varient?.unit_price
        ) * item.quantity;
    });
    return subTotal;
  };

  const placeOrder = (e) => {
    if (disablePlaceOrder) return;

    setDisablePlaceOrder(true);
    // console.log(
    //   "disabled",
    //   placeOrderButtonRef?.current?.getAttribute("disabled")
    // );
    // if (placeOrderButtonRef?.current?.getAttribute("disabled")) {
    //   console.log(
    //     "disabled",
    //     placeOrderButtonRef?.current?.getAttribute("disabled")
    //   );
    //   return;
    // }
    // if (placeOrderButtonRef.current) {
    //   placeOrderButtonRef.current.setAttribute("disabled", "disabled");
    // }

    const errorsData = {};
    let orderData = {};
    if (isAuthenticated) {
      if (!orderContent.customer_name) {
        errorsData.customer_name = "Name is required";
      }

      if (!orderContent.mobile) {
        errorsData.mobile = "mobile is required";
      }
      // else if (orderContent.mobile.length !== 10) {
      //   errorsData.mobile = "Mobile length should be 10 characters";
      // }

      if (!addresses[selectedAddressIndex].building_no) {
        errorsData.building_no = "Address (building no) is required";
      }
      if (!addresses[selectedAddressIndex].street_no) {
        errorsData.street_no = "Address (street no) is required";
      }
      if (!addresses[selectedAddressIndex].zone_no) {
        errorsData.zone_no = "Address (zone no) is required";
      }

      // if (!orderContent.delivery_note) {
      //   errorsData.delivery_note = "Note is required";
      // }
      if (Object.keys(errorsData).length) {
        setErrors(errorsData);
        toast.error(errorsData[Object.keys(errorsData)[0]], {
          className: "my-toast",
        });
        return;
      }
    } else {
      if (!unAuthenticatedUser.firstName || !unAuthenticatedUser.lastName) {
        errorsData.customer_name = "Name is required";
      }

      if (!unAuthenticatedUser.mobile) {
        errorsData.mobile = "mobile is required";
      }
      // else if (unAuthenticatedUser.mobile.length !== 10) {
      //   errorsData.mobile = "Mobile length should be 10 characters";
      // }

      if (!unAuthenticatedUser.address.building_no) {
        errorsData.building_no = "Address (building no) is required";
      }
      if (!unAuthenticatedUser.address.street_no) {
        errorsData.street_no = "Address (street no) is required";
      }
      if (!unAuthenticatedUser.address.zone_no) {
        errorsData.zone_no = "Address (zone no) is required";
      }

      // if (!unAuthenticatedUser.delivery_note) {
      //   errorsData.delivery_note = "Note is required";
      // }
      if (Object.keys(errorsData).length) {
        setErrors(errorsData);
        toast.error(errorsData[Object.keys(errorsData)[0]], {
          className: "my-toast",
        });
        return;
      }
    }

    const isPaymentSucces = false;
    if (isAuthenticated) {
      orderData = {
        products: Object.values(getCartInLocalStorage()), //An array of objects
        location: location,
        customer_id: user._id,
        mobile: user.mobile,
        customer_name: user.name,
        shipping_address: {
          ...addresses[selectedAddressIndex],
          _id: undefined,
        },
        ...orderContent,
        payment_status:
          paymentMethod === "cod" || !isPaymentSucces ? "unpaid" : "paid",
        payment_method: paymentMethod, // one of ["card","cod"]
      };
    } else {
      orderData = {
        products: Object.values(getCartInLocalStorage()),
        location: location,
        mobile: unAuthenticatedUser.mobile,
        customer_name:
          unAuthenticatedUser.firstName + " " + unAuthenticatedUser.lastName,
        shipping_address: {
          ...unAuthenticatedUser.address,
        },
        delivery_note: unAuthenticatedUser.delivery_note,
        delivery_time: unAuthenticatedUser.delivery_time,
        payment_status:
          paymentMethod === "cod" || !isPaymentSucces ? "unpaid" : "paid",
        payment_method: paymentMethod,
      };
    }
    if (orderData.delivery_note === "") {
      delete orderData.delivery_note;
    }
    if (
      orderData.location.longitude === "" ||
      orderData.location.latitude === ""
    ) {
      delete orderData.location;
    }
    propsCreateData("PLACE_ORDER", "order", orderData).then((res) => {
      if (res.error)
        toast.error("Error while creating order", {
          className: "my-toast",
        });
      else {
        propsUpdateData("UPDATE_CART", `/user/cart`, {
          clear: true,
        }).then((result) => {
          history.push("/", { orderSummary: res.payload.data });
        });
        toast.success("Order placed", {
          className: "my-toast",
        });
        localStorage.removeItem("cart");
        setCartInLocal({});
      }
    });
    // placeOrderButtonRef.current.removeAttribute("disabled");
    // setDisablePlaceOrder(false);
  };

  const handleAddressChange = ({ target }, changeIndex = 0) => {
    const { name, value } = target;
    const upData = addresses[changeIndex]
      ? { ...addresses[changeIndex], [name]: value }
      : { [name]: value };
    if (addresses.length > 1) {
      setAddresses(
        addresses.map((curVal, index) => {
          if (index === changeIndex) return upData;
          return curVal;
        })
      );
    } else {
      setAddresses([upData]);
    }
  };

  const handleChangeForUnAuthenticatedUser = (e, isAddress = false) => {
    const { name, value } = e.target;
    if (isAddress) {
      return setUnAuthenticatedUser({
        ...unAuthenticatedUser,
        address: {
          ...unAuthenticatedUser.address,
          [name]: value,
        },
      });
    }
    return setUnAuthenticatedUser({ ...unAuthenticatedUser, [name]: value });
  };

  const OrderSummaryComponent = () => (
    <div
      className={`${
        !isDesktop ? "mt-2" : "p-4"
      } d-flex flex-column col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4`}
    >
      <div className="mb-3 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <h3>{t("shoppingCart")}</h3>
      </div>
      <div className="col-12 mb-3 border">
        {cartItems.length > 0 &&
          cartItems.map((item, index) => (
            <div className="d-flex flex-column p-3 border-bottom">
              <span className="mb-2">
                {item.product?.i18nResourceBundle.name}
              </span>
              <div className="d-flex flex-row flex-wrap justify-content-between">
                <CheckoutPageSmallWrapper>
                  x {item.quantity}
                </CheckoutPageSmallWrapper>
                <CheckoutPagePriceWrapper className="col-md-5 col-xl-4">
                  {t("riyalText")}{" "}
                  {getDiscountedPrice(
                    item.product?.flash?.discount_type ||
                      item.product?.varient?.discount_type,
                    item.product?.flash?.discount_amount ||
                      item.product?.varient?.discount_amount,
                    item.product?.varient?.unit_price
                  )}
                </CheckoutPagePriceWrapper>
              </div>
            </div>
          ))}
        <div className={`d-flex flex-column p-3 border-bottom`}>
          <div className="d-flex flex-row justify-content-between">
            <span className="col-md-7 col-xl-8">{t("subTotal")}</span>
            <CheckoutPagePriceWrapper className="col-md-5 col-xl-4">
              {t("riyalText")} {calcSubTotal()}
            </CheckoutPagePriceWrapper>
          </div>
          {/* <span style={{ height: 25 }}></span> */}
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="row" style={{ backgroundColor: "white" }}>
        <div>
          {!isAuthenticated ? (
            <>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-muted py-2 pt-4">
                  Hello, Returning Customer ?
                </h2>
                <span className="text-muted pb-4">
                  Login to Qsales2022.com or{" "}
                  <a
                    href="#"
                    onClick={() => {
                      setShowModal(true);
                      setIsSignIn(false);
                    }}
                  >
                    Create an account
                  </a>
                </span>
                <button
                  className="mr-3 btn  btn-sm btn-qs-primary fw-normal px-4 py-2  small"
                  onClick={() => {
                    setShowModal(true);
                    setIsSignIn(true);
                  }}
                >
                  {t("login")}
                </button>
                <h4 className="seperator mt-4">
                  <span className="px-2 text-muted">OR</span>
                </h4>
                <h2 className="text-muted py-2">Checkout as a Guest</h2>
              </div>
            </>
          ) : (
            <>
              <div className="col-12 mb-3">
                <div className="d-flex justify-content-center mt-3">
                  <h2>Checkout</h2>
                </div>
              </div>
            </>
          )}
        </div>
        <div
          className={`${
            isDesktop && "d-flex flex-column align-items-center"
          } col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 p-4`}
        >
          <div className="mb-3 col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <h3>{t("billingAddress")}</h3>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            {isAuthenticated ? (
              <div className="">
                <div className="d-flex flex-column">
                  <label className="w-100">{t("fullName")}</label>
                  <input
                    type="text"
                    name="customer_name"
                    className="p-2 mb-2"
                    value={orderContent.customer_name}
                    onChange={({ target }) => {
                      setOrderContent({
                        ...orderContent,
                        customer_name: target.value,
                      });
                    }}
                    placeholder={t("fullName")}
                  />
                  {errors.customer_name && <p>{errors.customer_name}</p>}
                  <label className="w-100">{t("phone")}</label>
                  <input
                    className="p-2 mb-2"
                    name="mobile"
                    value={orderContent.mobile}
                    onChange={({ target }) => {
                      setOrderContent({
                        ...orderContent,
                        mobile: target.value,
                      });
                    }}
                    placeholder={t("phone")}
                  />
                  {errors.mobile && <p>{errors.mobile}</p>}

                  {/* <div className="d-flex flex-row justify-content-between mt-2 ">
                  <p className="fw-normal primary-color p-2 px-0 w-50 pointer">
                    <u onClick={() => props.logoutUser()}>
                      {t("signInToAnotherAccount")}
                    </u>
                  </p>
                </div> */}
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column">
                <div className="d-flex">
                  <label className="w-100">{t("firstName")}</label>
                  <label className="w-100">{t("lastName")}</label>
                </div>
                <div className="d-flex">
                  <input
                    className="p-2 mb-2 col-6"
                    name="firstName"
                    value={unAuthenticatedUser.firstName}
                    onChange={handleChangeForUnAuthenticatedUser}
                    placeholder={t("firstName")}
                  />
                  <input
                    className="p-2 mb-2 ms-1 col-6"
                    name="lastName"
                    value={unAuthenticatedUser.lastName}
                    onChange={handleChangeForUnAuthenticatedUser}
                    placeholder={t("lastName")}
                  />
                </div>
                <label className="w-100">{t("phone")}</label>
                <input
                  className="p-2 mb-2"
                  name="mobile"
                  value={unAuthenticatedUser.phone}
                  onChange={handleChangeForUnAuthenticatedUser}
                  placeholder={t("phone")}
                />
              </div>
            )}
          </div>

          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 align-items-start justify-content-start">
            {isAuthenticated && (
              <>
                {addresses?.map((address, i) => (
                  <div className="mb-3 border-bottom py-2 align-items-start justify-content-start">
                    <div className="align-items-start justify-content-start">
                      <input
                        className="form-check-input p-2 mt-1 me-3 ms-2 mb-2 align-self-start "
                        type="radio"
                        onChange={() => setSelectedAddressIndex(i)}
                        name="flexRadioDefault"
                        checked={selectedAddressIndex === i}
                        id="flexRadioDefault1"
                      />
                      {ADDRESS_FIELDS.map(({ label, name }) => (
                        <div className="d-flex">
                          <label className="p-2 w-25">{label}</label>
                          <input
                            className="p-2 ml-5 w-75 mb-2"
                            name={name}
                            disabled={editable !== i}
                            onChange={({ target }) =>
                              handleAddressChange({ target }, i)
                            }
                            onBlur={() => updateAddress(i)}
                            value={address[name] || ""}
                            placeholder={`Enter your ${name.replace("_", " ")}`}
                          />
                        </div>
                      ))}
                      <div className="d-flex gap-3 ms-2">
                        <p
                          style={{
                            cursor: "pointer",
                          }}
                          className="p-0 primary-color gap-1"
                          onClick={() => {
                            setEditable(i);
                          }}
                        >
                          {t("edit")}
                        </p>
                        <p
                          style={{ cursor: "pointer" }}
                          className="p-0 m-0 primary-color "
                          onClick={() => deletAddress(i)}
                        >
                          {t("delete")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {!isAuthenticated &&
              ADDRESS_FIELDS.map(({ label, name }) => (
                <div className="d-flex flex-column mt-2 ">
                  <label className="w-100">{label}</label>
                  <input
                    className="p-2 ml-5 mb-2"
                    name={name}
                    onChange={(e) =>
                      handleChangeForUnAuthenticatedUser(e, true)
                    }
                    value={unAuthenticatedUser.address[name] || ""}
                    placeholder={`Enter your ${name.replace("_", " ")}`}
                  />
                </div>
              ))}
            {!isAuthenticated && (
              <div className="d-flex flex-row justify-content-end small gap-2">
                <button
                  className="mr-3 btn btn-sm btn-qs-primary fw-normal p-2 m-1 small"
                  onClick={handleGetLocation}
                >
                  Allow Location
                </button>
              </div>
            )}
            <div className="d-flex flex-row justify-content-end small gap-2">
              {isAuthenticated && (
                <>
                  <button
                    className="mr-3 btn btn-sm btn-qs-primary fw-normal p-2 m-1 small"
                    onClick={() => {
                      setAddresses([
                        ...addresses,
                        {
                          building_no: "",
                          street_no: "",
                          zone_no: "",
                        },
                      ]);
                      setEditable(addresses.length);
                    }}
                  >
                    {t("addNew")}
                  </button>
                  <button
                    className="mr-3 btn btn-sm btn-qs-primary fw-normal p-2 m-1 small"
                    onClick={handleGetLocation}
                  >
                    Allow Location
                  </button>
                </>
              )}
              {/* {addresses.length ? (
                <button
                  className="btn btn-sm btn-qs-primary fw-normal p-2 w-25 small"
                  onClick={() => {
                    setExpandedKey("3");
                  }}
                >
                  {t("continue")}
                </button>
              ) : (
                <></>
              )} */}
            </div>
          </div>

          <div className="d-flex flex-column col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <label className="w-100">{"Add a note"}</label>

            <input
              className="p-2 mb-2 overflow-hidden"
              onChange={(e) => {
                if (isAuthenticated) {
                  return setOrderContent({
                    ...orderContent,
                    delivery_note: e.target.value,
                  });
                }
                handleChangeForUnAuthenticatedUser(e);
              }}
              name="delivery_note"
              placeholder="Optional"
              value={
                isAuthenticated
                  ? orderContent.delivery_note
                  : unAuthenticatedUser.delivery_note
              }
            />
            {errors.delivery_note && <p>{errors.delivery_note}</p>}
          </div>
          <div className="d-flex flex-column col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <label className="w-100">{t("deliveryTime")}</label>
            <select
              className="p-2"
              name="delivery_time"
              onChange={(e) => {
                if (isAuthenticated) {
                  return setOrderContent({
                    ...orderContent,
                    delivery_time: e.target.value,
                  });
                }
                handleChangeForUnAuthenticatedUser(e);
              }}
              value={
                isAuthenticated
                  ? orderContent.delivery_time
                  : unAuthenticatedUser.delivery_time
              }
            >
              {[
                "Any time",
                "Morning (8am - 12pm)",
                "Noon (12pm - 4pm)",
                "Evening (4pm - 8pm)",
              ].map((v) => (
                <option value={v}>{v}</option>
              ))}
            </select>
          </div>

          <div className="d-flex flex-column mt-2 col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <label className="w-100">{t("paymentOptions")}</label>
            <div className="d-flex mt-1">
              <div className="d-flex align-items-center me-3">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <label className="ms-2">{t("cashOnDelivery")}</label>
              </div>

              {/* <div className="d-flex align-items-center">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <label className="ms-2">{t("netBanking")}</label>
              </div> */}
            </div>
          </div>
          {!isDesktop && <OrderSummaryComponent />}

          <div className="d-flex flex-row justify-content-end small gap-2 col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <button
              className={`${
                !isDesktop ? "w-50" : "w-25"
              } mr-3 btn  btn-sm btn-qs-primary fw-normal p-2 small`}
              onClick={(e) => placeOrder(e)}
              disabled={disablePlaceOrder}
            >
              {t("placeOrder")}
            </button>
          </div>
        </div>
        {isDesktop && <OrderSummaryComponent />}
      </div>
      {showModal ? (
        isSignIn && !forgotPwd ? (
          <SignIn
            setShowModal={setShowModal}
            setForgotPwd={setForgotPwd}
            setIsSignIn={setIsSignIn}
          />
        ) : (
          <SignUp setShowModal={setShowModal} setIsSignIn={setIsSignIn} />
        )
      ) : (
        ""
      )}
      {showModal && forgotPwd ? (
        <ForgetPassword
          setIsSignIn={setIsSignIn}
          setForgotPwd={setForgotPwd}
          setShowModal={setShowModal}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

/**
 * map State To Props
 * @constant
 * @param {*} state state
 */
const mapStateToProps = (state) => ({
  ...state.authReducer,
  cartDetails: state.getCartDetailsReducer,
  userData: state.getUser,
});

/**
 * Export
 */
export default connect(mapStateToProps, {
  getData,
  createData,
  deleteData,
  updateData,
  logoutUser,
})(CheckoutSteps);
