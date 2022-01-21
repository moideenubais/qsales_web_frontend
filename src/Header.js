/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { Link, withRouter } from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  loginUser,
  resetPassword,
  setAuthToken,
  logoutUser,
} from "./redux/actions/auth";
import { createData, updateData, getData } from "./redux/actions";
import { ActionTypes } from "./redux/contants/action-types";
import axios from "axios";
import { getCartInLocalStorage } from "./heper";
import { useCartContext } from "./context/cartContext";
import SignIn from "./components/Auth/SignIn";
import UserProfile from "./components/Auth/UserProfile";
import SignUp from "./components/Auth/SignUp";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ReactSelect from "react-select";
import { useCallback } from "react";
import OrderDetail from "./components/Auth/OrderDetail";
import TopBar from "./components/TopBar";

const passwordRegex =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

function Header(props) {
  const { errors: userErrors, history, user, token: userToken } = props;
  const { cartInLocal } = useCartContext();

  const { t, i18n } = useTranslation();
  const searchRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [forgotPwd, setForgotPwd] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResponse, setSearchReponse] = useState([]);
  const [suggestionActive, setSuggestionActive] = useState(false);

  const isEmptyObj = (v) => {
    return typeof value === "object" && Object.keys(v).length === 0;
  };

  useEffect(() => {
    if (!localStorage.jwtToken && userToken) {
      setAuthToken(userToken);
      localStorage.setItem("jwtToken", userToken);
    }
  }, [userToken]);

  const validatePasswords = ({ password, confirm_password }, setError) => {
    if (!new RegExp(passwordRegex).test(password)) {
      setError("password", {
        type: "manual",
        message:
          "Password should be of 8 character with atleast one uppercase and lowercase letter, number and special character",
      });
      return false;
    }

    if (confirm_password && password !== confirm_password) {
      setError("confirm_password", {
        type: "manual",
        message: "Password does not match",
      });
      return false;
    }
    return true;
  };

  const switchLanguage = ({ label, value }) => {
    // const lang = i18n.language === "en" ? "ar" : "en";
    localStorage.setItem("lang", value);
    return i18n.changeLanguage(value);
  };

  // FORGOT PASSWORD COMPONENT
  // const ForgotPasswordComponent = () => {
  //   const {
  //     register,
  //     handleSubmit,
  //     reset,
  //     formState: { errors },
  //     setError,
  //   } = useForm();

  //   const onForgotSubmit = (SignInData) => {
  //     props.resetPassword(SignInData).then(() => {
  //       setIsSignIn(true);
  //       setForgotPwd(false);
  //     });
  //   };

  //   useEffect(() => {
  //     if (!userErrors?.msg) return;
  //     setError("email", { type: "manual", message: userErrors.msg });
  //   }, [setError]);

  //   return (
  //     <div className="shadow-lg col-12 bg-transparent-full">
  //       <div className="signIn-model col-3 p-4 bg-white rounded shadow-lg border">
  //         <div className="my-2 d-flex flex-row justify-content-between">
  //           <div className="">
  //             <h6 className="mb-2">Forgot Password</h6>
  //             <h5 className="fw-bold">
  //               Enter your email to recover your password. You will receive an
  //               email with instructions.
  //             </h5>
  //           </div>
  //           <button
  //             type="button"
  //             className="bg-white border-0 fs-4 p-0 m-0 animate-close"
  //             onClick={() => {
  //               setShowModal(false);
  //               setForgotPwd(false);
  //             }}
  //           >
  //             &#10005;
  //           </button>
  //         </div>
  //         <form
  //           onSubmit={handleSubmit(onForgotSubmit)}
  //           className="d-flex flex-column my-3"
  //         >
  //           <div className="form-group d-flex flex-column my-2">
  //             <label className="small mb-1">Email</label>
  //             <input
  //               className="qs-input p-2 rounded"
  //               type="email"
  //               placeholder="Email"
  //               {...register("email", {
  //                 required: "Email is required",
  //                 pattern: /^\S+@\S+$/i,
  //               })}
  //             />
  //             {errors.email && <p>{errors.email.message}</p>}
  //           </div>
  //           <div className="d-flex flex-row align-items-center">
  //             <button
  //               type="submit"
  //               className="w-25 btn btn-qs-primary mt-2 p-2 me-5"
  //             >
  //               Send
  //             </button>
  //           </div>
  //         </form>
  //         <hr className="text-secondary my-2" />
  //         <div className="">
  //           <p className="small m-0 p-0">
  //             Already have an account ?{" "}
  //             <span
  //               className="primary-color fw-normal cp"
  //               onClick={() => {
  //                 setIsSignIn(true);
  //                 setForgotPwd(false);
  //                 reset({ email: "", password: "", confirm_password: "" });
  //               }}
  //             >
  //               Sign in
  //             </span>
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  useEffect(() => {
    if (searchText === "") {
      setSuggestionActive(false);
      return setSearchReponse([]);
    }

    axios
      .get(`product?search=${searchText}&user_type=user&limit=5`)
      .then((res) => {
        setSuggestionActive(true);
        if (!res.data.products || res.data.products.length === 0) {
          return setSearchReponse([]);
        }
        const searchedProducts = res.data.products.map((item) => {
          return {
            ...item,
            imageUrl: item.product_image_small_url,
          };
        });
        setSearchReponse(searchedProducts);
      });
  }, [searchText]);

  // console.log("Language",i18n.language)
  // const languages = [
  //   { label: "English", value: "en" },
  //   { label: "Arabic", value: "ar" },
  // ];

  const [showOrderModal, setOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const setOrderModalShow = useCallback((order) => {
    setSelectedOrder(order);
    setOrderModal(true);
  },[setSelectedOrder,setOrderModal])

  useEffect(()=>{
    if(isSignIn || showOrderModal) {
    setOrderModal(false);
    setShowProfile(false);
    
  }
  },[history?.location?.pathname])

  useEffect(()=>{
    document.addEventListener("click", (e) => {
      var parent = document.querySelector("#main-search-content");
      if (parent?.contains(e.target)) {
      }else{
        setSearchText("");
        setSuggestionActive(false)
      }
    });
  },[])

  return (
    <>
    <TopBar switchLanguage={switchLanguage} />
      <header className="col-12 col-md-12 col-lg-12 bg-primary">
        <div className="col-md-9  mx-auto py-1">
          <div className="row">
            <div className="col-lg-7 col-md-6 d-flex flex-row align-items-center justify-content-between">
              <div className="">
                <Link className="text-decoration-none" to={{ pathname: `/` }}>
                  {/* <h6 className="p-0 px-3 m-0 text-white">Qsales</h6> */}
                  <img
                    src="../assets/images/4.png"
                    height="70px"
                    width="70px"
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="p-0 w-75 dropdown-content" id="main-search-content">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder={t("searchBox")}
                  className={`search border px-2 py-1 rounded w-100 ${
                    i18n.language == "ar" ? "text-right" : ""
                  }`}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onFocusCapture={()=>setSearchText("")}
                />
                <div
                  style={{
                    width: searchRef?.current?.offsetWidth,
                  }}
                >
                  {suggestionActive ? (
                    searchResponse.length > 0 ? (
                      searchResponse.map((item) => {
                        return (
                          <a
                            className="dropdown-list-item pointer"
                            onClick={() => history.push(`/product/${item._id}`)}
                          >
                            <img
                              alt="img"
                              src={`${process.env.REACT_APP_IMAGE_URL}/${item.imageUrl}`}
                              width={40}
                              height={40}
                              style={{ borderRadius: 20 }}
                            />
                            <span
                              style={{ textOverflow: "ellipsis" }}
                              className="dropdown-list-item-text"
                            >
                              {item.name}
                            </span>
                          </a>
                        );
                      })
                    ) : (
                      <p>No product Found</p>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 d-flex flex-row align-items-center justify-content-end header-btn-group">
              <div className="d-flex flex-row align-items-center justify-content-center p-0">
                {user?.name ? (
                  <div className="d-flex flex-row align-items-center px-3 border-right">
                    <p
                      className="text-white small p-0 m-0 me-2 nowrap"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowProfile(true);
                      }}
                    >
                      {user.name || "Profile"}
                    </p>
                    <img src="../assets/images/user.svg" alt="userIcon" />
                  </div>
                ) : (
                  <div className="d-flex flex-row align-items-center px-3 border-right">
                    <p
                      className="text-white small p-0 m-0 mr-2 me-2 nowrap"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      Sign In
                    </p>
                    <img src="../assets/images/user.svg" alt="userIcon" />
                  </div>
                )}
               {/* <div className="d-flex flex-row align-items-center pointer px-3 lang-change language-selector">
                  <ReactSelect
                    value={languages.find((lan) => lan.value == i18n.language)}
                    options={languages}
                    onChange={switchLanguage}
                    isSearchable={false}
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        backgroundColor: "#8f1d3f",
                        color: "white",
                        border: "none"
                      }),
                    }}
                  />
                </div>  */}
                <div
                  className="d-flex flex-row align-items-center px-3 pointer"
                  onClick={() => {
                    history.push("/cart");
                  }}
                >
                  <p
                    className="text-white small p-0 m-0 mr-2 me-2"
                    style={{ cursor: "pointer" }}
                  >
                    {t("cart")}
                  </p>
                  <div style={{ position: "relative" }}>
                    <img src="../assets/images/cartWhite.svg" alt="cartIcon" />
                    <span
                      className="small"
                      style={{
                        paddingBottom: "14px !important",
                        position: "absolute",
                        left: 20,
                        color:"rgb(255, 224, 73)"
                      }}
                    >
                      {Object.keys(cartInLocal)?.length}
                    </span>
                  </div>
                </div>
                {user?.name && (
                  <div className="px-3 pointer text-white">
                    <p className="nowrap" onClick={() => props.logoutUser()}>
                      Sign Out
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <Toaster />

      {showProfile && (
        <UserProfile
          setShowProfile={setShowProfile}
          setIsSignIn={setIsSignIn}
          user={user}
          setOrderModalShow={setOrderModalShow}
        />
      )}

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

      {showOrderModal && (
        <OrderDetail order={selectedOrder} setShowModal={setOrderModal} />
      )}
    </>
  );
}

/**
 * map State To Props
 * @constant
 * @param {*} state state
 */
const mapStateToProps = (state) => ({
  ...state.authReducer,
  orderReducer: state.getAllOrdersReducer,
});

/**
 * Export
 */
export default withRouter(
  connect(mapStateToProps, {
    loginUser,
    logoutUser,
    resetPassword,
    createData,
    updateData,
    getData,
  })(Header)
);
