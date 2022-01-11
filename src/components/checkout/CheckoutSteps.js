import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  getData,
  updateData,
  createData,
  deleteData,
} from "../../redux/actions";
import {
  logoutUser
} from "../../redux/actions/auth.js";
import CartComponent from "../../components/Cart";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import { getCartInLocalStorage } from "../../heper";
import { useCartContext } from "../../context/cartContext";
import SignIn from "../../components/Auth/SignIn";
import SignUp from "../../components/Auth/SignUp";
import ForgetPassword from "../../components/Auth//ForgetPassword";

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

  ///LoginLogout STates
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
  const [orderContent, setOrderContent] = React.useState({
    delivery_note: "", // [OPTIONAL]
    delivery_time: "Any time",
  });

  const [location,setLocation]=useState({latitude:"",longitude:""})
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocation);
    }
  }, [])
  const handleLocation=(postion)=>{
    setLocation({latitude:postion.coords.latitude,longitude:postion.coords.longitude});
  }
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

  const getAddressData = () => {
    propsGetData("GET_USER", `user/${user?._id}`).then((res) => {
      if (!res.error) setAddresses(res.payload.data.address);
    });
  };

  useEffect(() => {
    getAddressData();
  }, []);

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
      } else toast.error("Error on deleting address",{ 
        className:"my-toast"
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
        toast.success("Address updated",{ 
          className:"my-toast"
        });
        setSelectedAddressIndex(index);
        getAddressData();
      } else toast.error("Error on updating address",{ 
        className:"my-toast"
      });
    });
  };

  const placeOrder = () => {
    const errorsData = {};
    let orderData = {};
    if (isAuthenticated) {
      if (!orderContent.customer_name) {
        errorsData.customer_name = "Name is required";
      }
      
      if (!orderContent.mobile) {
        errorsData.mobile = "mobile is required";
      } else if (orderContent.mobile.length !== 10) {
        errorsData.mobile = "Mobile length should be 10 characters";
      }

      if (!addresses[selectedAddressIndex].building_no) {
        errorsData.building_no = "Address (building no) is required";
      }
      if (!addresses[selectedAddressIndex].street_no) {
        errorsData.street_no = "Address (street no) is required";
      }
      if (!addresses[selectedAddressIndex].zone_no) {
        errorsData.zone_no = "Address (zone no) is required";
      }

      if (!orderContent.delivery_note) {
        errorsData.delivery_note = "Note is required";
      }
      if (Object.keys(errorsData).length) {
        setErrors(errorsData);
        toast.error(errorsData[Object.keys(errorsData)[0]],{ 
          className:"my-toast"
        });
        return;
      }
    }else{
      if (!unAuthenticatedUser.firstName || !unAuthenticatedUser.lastName) {
        errorsData.customer_name = "Name is required";
      }
      
      if (!unAuthenticatedUser.mobile) {
        errorsData.mobile = "mobile is required";
      } else if (unAuthenticatedUser.mobile.length !== 10) {
        errorsData.mobile = "Mobile length should be 10 characters";
      }


      if (!unAuthenticatedUser.address.building_no) {
        errorsData.building_no = "Address (building no) is required";
      }
      if (!unAuthenticatedUser.address.street_no) {
        errorsData.street_no = "Address (street no) is required";
      }
      if (!unAuthenticatedUser.address.zone_no) {
        errorsData.zone_no = "Address (zone no) is required";
      }

      if (!unAuthenticatedUser.delivery_note) {
        errorsData.delivery_note = "Note is required";
      }
      if (Object.keys(errorsData).length) {
        setErrors(errorsData);
        toast.error(errorsData[Object.keys(errorsData)[0]],{ 
          className:"my-toast"
        });
        return;
      }
    }

    const isPaymentSucces = false;
    if (isAuthenticated) {
      orderData = {
        products: Object.values(getCartInLocalStorage()), //An array of objects
        location:location, 
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
        location:location, 
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
    propsCreateData("PLACE_ORDER", "order", orderData).then((res) => {
      if (res.error) toast.error("Error while creating order",{ 
        className:"my-toast"
      });
      else {
        propsUpdateData("UPDATE_CART", `/user/cart`, {
          clear: true,
        }).then((res) => {
          history.push("/");
        });
        toast.success("Order placed",{ 
          className:"my-toast"
        });
        localStorage.removeItem("cart");
        setCartInLocal({});
      }
    });
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

  return (
    <React.Fragment>
      <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-4 ">
        <Accordion
          defaultActiveKey="0"
          activeKey={expandedKey}
          onSelect={(e) => {
            setExpandedKey(e);
          }}
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>{t("userDetails")}</Accordion.Header>
            <Accordion.Body className="p-3">
              <div className="col-12">
                {isAuthenticated ? (
                  <div className="">
                    <div className="d-flex flex-column">
                      <span className="fw-normal ">
                        {t("name")}{" "}
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
                        />
                        {errors.customer_name && <p>{errors.customer_name}</p>}
                      </span>
                      <span className="fw-normal mt-2">
                        {t("phone")}{" "}
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
                        />
                        {errors.mobile && <p>{errors.mobile}</p>}
                      </span>

                      <div className="d-flex flex-row justify-content-between mt-2 ">
                        <p className="fw-normal primary-color p-2 px-0 w-50 pointer">
                          <u
                          onClick={()=>props.logoutUser()}
                          >{t("signInToAnotherAccount")}</u>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      className="p-2 mb-2 me-2"
                      name="firstName"
                      value={unAuthenticatedUser.firstName}
                      onChange={handleChangeForUnAuthenticatedUser}
                      placeholder="First name"
                    />
                    <input
                      className="p-2 mb-2"
                      name="lastName"
                      value={unAuthenticatedUser.lastName}
                      onChange={handleChangeForUnAuthenticatedUser}
                      placeholder="Last name"
                    />
                    <br />
                    <input
                      className="p-2 mb-2"
                      name="mobile"
                      value={unAuthenticatedUser.phone}
                      onChange={handleChangeForUnAuthenticatedUser}
                      placeholder="Mobile Number"
                    />
                    <br />
                    <button
                      className="mr-3 mt-3 btn btn-sm btn-qs-primary fw-normal p-2 w-25 small"
                      onClick={()=>setShowModal(true)}
                    >
                      {t("login")}
                    </button>
                  </>
                )}
              </div>
              <div className="d-flex flex-row justify-content-end small gap-2">
                <button
                  className="mr-3 btn btn-sm btn-qs-primary fw-normal p-2 m-1 small"
                  onClick={() => {
                    setExpandedKey("1");
                  }}
                >
                  {t("continue")}
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" expanded={expandedKey === "1"}>
            <Accordion.Header>{t("deliveryAddress")}</Accordion.Header>
            <Accordion.Body className="p-3">
              <div className="col-12 align-items-start justify-content-start">
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
                {!isAuthenticated &&
                  ADDRESS_FIELDS.map(({ label, name }) => (
                    <div className="d-flex">
                      <label className="p-2 w-25">{label}</label>
                      <input
                        className="p-2 ml-5 w-75 mb-2"
                        name={name}
                        onChange={(e) =>
                          handleChangeForUnAuthenticatedUser(e, true)
                        }
                        value={unAuthenticatedUser.address[name] || ""}
                        placeholder={`Enter your ${name.replace("_", " ")}`}
                      />
                    </div>
                  ))}
                <div className="d-flex flex-row justify-content-end small gap-2">
                  {isAuthenticated && (
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
                  )}
                  {addresses.length ? (
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
                  )}
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>{t("deliveryPreferences")}</Accordion.Header>
            <Accordion.Body className="p-3">
              <div className="d-flex">
                <p className="small fw-normal text-dark mb-1 col-2">
                  {t("deliveryNote")}
                </p>
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
                  placeholder=""
                  value={
                    isAuthenticated
                      ? orderContent.delivery_note
                      : unAuthenticatedUser.delivery_note
                  }
                />
                {errors.delivery_note && <p>{errors.delivery_note}</p>}
              </div>
              <div className="d-flex">
                <p className="small fw-normal text-dark mb-1 col-2">
                  {t("deliveryTime")}
                </p>
                <select
                  className="p-2 delivery-option"
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
              <div className="d-flex flex-row justify-content-end small gap-2">
                <button
                  className="mr-3 btn btn-sm btn-qs-primary fw-normal p-2 m-1 small"
                  onClick={() => {
                    setExpandedKey("4");
                  }}
                >
                  {t("continue")}
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>{t("orderSummarySmall")}</Accordion.Header>
            <Accordion.Body className="p-3">
              <CartComponent checkoutPage />
              <div className="d-flex flex-row justify-content-end small gap-2">
                <button
                  className="mr-3 btn btn-sm btn-qs-primary fw-normal p-2 m-1 small"
                  onClick={() => {
                    setExpandedKey("5");
                  }}
                >
                  {t("proceedToPay")}
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>{t("paymentOptions")}</Accordion.Header>
            <Accordion.Body className="p-3">
              <div className="d-flex flex-row align-items-center mb-1">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <p className="small ms-2">{t("cashOnDelivery")}</p>
              </div>

              <div className="d-flex flex-row align-items-center">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <p className="small ms-2">{t("netBanking")}</p>
              </div>
              <div className="d-flex flex-row justify-content-end small gap-2">
                <button
                  className="mr-3 btn btn-sm btn-qs-primary fw-normal p-2 m-1 small"
                  onClick={placeOrder}
                >
                  {t("placeOrder")}
                </button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
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
  logoutUser
})(CheckoutSteps);
