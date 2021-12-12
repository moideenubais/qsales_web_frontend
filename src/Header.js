/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { Link, withRouter } from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { loginUser, resetPassword, setAuthToken } from "./redux/actions/auth";
import { createData, updateData } from "./redux/actions";
import { ActionTypes } from "./redux/contants/action-types";
import axios from "axios";
import { getCartInLocalStorage } from "./heper";

const passwordRegex =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

function Header(props) {
  const { errors: userErrors, history, user, token: userToken, cartInLocal } = props;

  const { t } = useTranslation();
  const searchRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [forgotPwd, setForgotPwd] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResponse, setSearchReponse] = useState([]);
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

  const switchLanguage = () => {
    const lang = i18n.language === "en" ? "ar" : "en";
    localStorage.setItem("lang", lang);
    return i18n.changeLanguage(lang);
  };

  // FORGOT PASSWORD COMPONENT
  const ForgotPasswordComponent = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
    } = useForm();

    const onForgotSubmit = (SignInData) => {
      props.resetPassword(SignInData).then(() => {
        setIsSignIn(true);
        setForgotPwd(false);
      });
    };

    useEffect(() => {
      if (!userErrors?.msg) return;
      setError("email", { type: "manual", message: userErrors.msg });
    }, [setError]);

    return (
      <div className="shadow-lg col-12 bg-transparent-full">
        <div className="signIn-model col-3 p-4 bg-white rounded shadow-lg border">
          <div className="my-2 d-flex flex-row justify-content-between">
            <div className="">
              <h6 className="mb-2">Forgot Password</h6>
              <h5 className="fw-bold">
                Enter your email to recover your password. You will receive an
                email with instructions.
              </h5>
            </div>
            <button
              type="button"
              className="bg-white border-0 fs-4 p-0 m-0 animate-close"
              onClick={() => {
                setShowModal(false);
                setForgotPwd(false);
              }}
            >
              &#10005;
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onForgotSubmit)}
            className="d-flex flex-column my-3"
          >
            <div className="form-group d-flex flex-column my-2">
              <label className="small mb-1">Email</label>
              <input
                className="qs-input p-2 rounded"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="d-flex flex-row align-items-center">
              <button
                type="submit"
                className="w-25 btn btn-qs-primary mt-2 p-2 me-5"
              >
                Send
              </button>
            </div>
          </form>
          <hr className="text-secondary my-2" />
          <div className="">
            <p className="small m-0 p-0">
              Already have an account ?{" "}
              <span
                className="primary-color fw-normal cp"
                onClick={() => {
                  setIsSignIn(true);
                  setForgotPwd(false);
                  reset({ email: "", password: "", confirm_password: "" });
                }}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const UserProfile = (userprops) => {
    const { user } = userprops;

    const {
      register,
      handleSubmit,
      reset,
      setError,
      formState: { errors },
    } = useForm();

    useEffect(() => {
      reset(user);
    }, [user, reset]);

    useEffect(() => {
      if (!userErrors?.msg) return;
      setError("email", { type: "manual", message: userErrors.msg });
    }, [setError]);

    const updateUser = (userData) => {
      if (isEmptyObj(errors)) return;
      props
        .updateData(ActionTypes.CREATE_USER, "/user", {
          ...userData,
        })
        .then((result) => {
          if (isEmptyObj(result?.error)) return;
          setIsSignIn(true);
        });
    };

    return (
      <div className="shadow-lg col-12 bg-transparent-full">
        <div className="signIn-model col-3 p-4 bg-white rounded shadow-lg border">
          <div className="my-2 d-flex flex-row justify-content-between">
            <div className="">
              <h6 className="mb-2">Profile</h6>
            </div>
            <button
              type="button"
              className="bg-white border-0 fs-4 p-0 m-0 animate-close"
              onClick={() => {
                setShowProfile(false);
              }}
            >
              &#10005;
            </button>
          </div>
          <form
            onSubmit={handleSubmit(updateUser)}
            className="d-flex flex-column my-3"
          >
            <div className="form-group d-flex flex-column my-2">
              <label for="formGroupExampleInput" className="small mb-1">
                Name
              </label>
              <input
                className="qs-input p-2 rounded"
                id="formGroupExampleInput"
                type="text"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="form-group d-flex flex-column my-2">
              <label for="formGroupExampleInput" className="small mb-1">
                Mobile
              </label>
              <input
                className="qs-input p-2 rounded"
                id="formGroupExampleInput"
                type="mobile"
                placeholder="Mobile"
                {...register("mobile", {
                  required: "Mobile is required",
                  pattern: /^[0-9]*$/i,
                })}
              />
            </div>
            <div className="form-group d-flex flex-column my-2">
              <label for="formGroupExampleInput" className="small mb-1">
                Email
              </label>
              <input
                className="qs-input p-2 rounded"
                id="formGroupExampleInput"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
            <div className="d-flex flex-row align-items-center">
              <button
                type="submit"
                className="w-25 btn btn-qs-primary mt-2 p-2 me-5"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // SIGN IN COMPONENT
  const SignIn = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
    } = useForm();

    const onSignInSubmit = (SignInData) => {
      if (isEmptyObj(errors)) return;

      const isValid = validatePasswords(
        { password: SignInData.password },
        setError
      );
      if (!isValid) return;

      props.loginUser(SignInData).then((res) => {
        if (!res.error) {
          const cart = getCartInLocalStorage();
          setTimeout(() => {
            props.updateData("UPDATE_CART", `/user/cart`, {
              cart: Object.values(cart),
            });
          }, 1000);
        }
        setShowModal(false);
      });
    };

    useEffect(() => {
      if (!userErrors?.msg) return;
      setError("email", { type: "manual", message: userErrors.msg });
    }, [setError]);

    return (
      <div className="shadow-lg col-12 bg-transparent-full">
        <div className="signIn-model col-3 p-4 bg-white rounded shadow-lg border">
          <div className="my-2 d-flex flex-row justify-content-between">
            <div className="">
              <h6 className="mb-2">Welcome Back!</h6>
              <h5 className="fw-bold">Sign in to your qsales account</h5>
            </div>
            <button
              type="button"
              className="bg-white border-0 fs-4 p-0 m-0 animate-close"
              onClick={() => {
                setShowModal(false);
              }}
            >
              &#10005;
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSignInSubmit)}
            className="d-flex flex-column my-3"
          >
            <div className="form-group d-flex flex-column my-2">
              <label className="small mb-1">Email</label>
              <input
                className="qs-input p-2 rounded"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="form-group d-flex flex-column my-2">
              <label className="small mb-1">Password</label>
              <input
                className="qs-input p-2 rounded"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className="d-flex flex-row align-items-center">
              <button
                type="submit"
                className="w-25 btn btn-qs-primary mt-2 p-2 me-5"
              >
                Sign in
              </button>
              <Link
                className="text-decoration-none"
                onClick={() => setForgotPwd(true)}
              >
                <a className="small text-center text-decoration-none fw-normal">
                  Forgot your Password ?
                </a>
              </Link>
            </div>
          </form>
          <hr className="text-secondary my-2" />
          <div className="">
            <p className="small m-0 p-0">
              Dont have an account ?{" "}
              <span
                className="primary-color fw-normal cp"
                onClick={() => {
                  setIsSignIn(false);
                  setForgotPwd(false);
                  reset({ email: "", password: "" });
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // SIGN UP COMPONENT
  const SignUp = () => {
    const {
      register,
      handleSubmit,
      reset,
      setError,
      formState: { errors },
    } = useForm();

    useEffect(() => {
      if (!userErrors?.msg) return;
      setError("email", { type: "manual", message: userErrors.msg });
    }, [setError]);

    const onSignUpSubmit = (SignUpData) => {
      if (isEmptyObj(errors)) return;

      const { password, confirm_password } = SignUpData;

      const isValid = validatePasswords(
        { password, confirm_password },
        setError
      );
      if (!isValid) return;

      props
        .createData(ActionTypes.CREATE_USER, "/user", {
          user_type: "user",
          ...SignUpData,
        })
        .then((result) => {
          if (isEmptyObj(result?.error)) return;
          setIsSignIn(true);
        });
    };

    return (
      <div className="shadow-lg col-12 bg-transparent-full">
        <div className="signIn-model col-3 p-4 bg-white rounded shadow-lg border">
          <div className="my-2 d-flex flex-row justify-content-between">
            <div className="">
              <h6 className="mb-2">Welcome Back!</h6>
              <h5 className="fw-bold">Create an qsales account</h5>
            </div>
            <button
              type="button"
              className="bg-white border-0 fs-4 p-0 m-0 animate-close"
              onClick={() => {
                setShowModal(false);
              }}
            >
              &#10005;
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSignUpSubmit)}
            className="d-flex flex-column my-3"
          >
            <div className="form-group d-flex flex-column my-2">
              <label for="formGroupExampleInput" className="small mb-1">
                Name
              </label>
              <input
                className="qs-input p-2 rounded"
                id="formGroupExampleInput"
                type="text"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="form-group d-flex flex-column my-2">
              <label for="formGroupExampleInput" className="small mb-1">
                Email
              </label>
              <input
                className="qs-input p-2 rounded"
                id="formGroupExampleInput"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="form-group d-flex flex-column my-2">
              <label for="formGroupExampleInput" className="small mb-1">
                Password
              </label>
              <input
                className="qs-input p-2 rounded"
                id="formGroupExampleInput"
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className="form-group d-flex flex-column my-2">
              <label for="formGroupExampleInput" className="small mb-1">
                Confirm Password
              </label>
              <input
                className="qs-input p-2 rounded"
                id="formGroupExampleInput"
                type="password"
                placeholder="Password"
                {...register("confirm_password", {
                  required: "Confirm password is required",
                })}
              />
              {errors.confirm_password && (
                <p>{errors.confirm_password.message}</p>
              )}
            </div>
            <div className="d-flex flex-row align-items-center">
              <button
                type="submit"
                className="w-25 btn btn-qs-primary mt-2 p-2 me-5"
              >
                Sign Up
              </button>
            </div>
          </form>
          <hr className="text-secondary my-2" />
          <div className="">
            <p className="small m-0 p-0">
              {" "}
              Already have an account ?{" "}
              <span
                className="primary-color fw-normal cp"
                onClick={() => {
                  setIsSignIn(true);
                  reset({ email: "", password: "", confirm_password: "" });
                }}
              >
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (searchText === "") {
      return setSearchReponse([]);
    }

    axios
      .get(`product?search=${searchText}&user_type=user&limit=5`)
      .then((res) => {
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

  return (
    <>
      <header className="col-12 col-md-12 col-lg-12 bg-primary">
        <div className="col-12 col-md-9 col-lg-9  mx-auto py-3 d-flex flex-row">
          <div className="col-2 d-flex flex-row align-items-center justify-content-start">
            <Link
              className="text-decoration-none"
              style={{ top: "0px", position: "absolute" }}
              to={{ pathname: `/` }}
            >
              {/* <h6 className="p-0 px-3 m-0 text-white">Qsales</h6> */}
              <img
                src="../assets/images/4.png"
                height="70px"
                width="70px"
                className="position-absolute"
                alt="images"
              />
            </Link>
          </div>
          <div className="col-md-5 col-lg-5 p-0 dropdown-content">
            <input
              ref={searchRef}
              type="text"
              placeholder="What are you looking for ?"
              className="search border px-2 py-1 rounded w-100"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div
              style={{
                width: searchRef?.current?.offsetWidth,
              }}
            >
              {searchResponse &&
                searchResponse.length > 0 &&
                searchResponse.map((item) => {
                  return (
                    <a
                      className="dropdown-list-item"
                      onClick={() => history.push(`/product/${item._id}`)}
                    >
                      <img
                        alt="img"
                        src={item.imageUrl}
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
                })}
            </div>
          </div>
          <div className="col-3 col-md-3 col-lg-3 d-flex flex-row align-items-center justify-content-center p-0">
            {user?.name ? (
              <div className="d-flex flex-row align-items-center px-3 border-right">
                <p
                  className="text-white small p-0 m-0 mr-2 me-2"
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
                  className="text-white small p-0 m-0 mr-2 me-2"
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
            <div className="d-flex flex-row align-items-center px-3">
              <img
                src="../assets/images/translate.svg"
                alt="translateIcon"
                style={{ width: 20, height: 20 }}
                onClick={() => switchLanguage()}
              />
            </div>
            <div className="d-flex flex-row align-items-center px-3">
              <p
                className="text-white small p-0 m-0 mr-2 me-2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/cart");
                }}
              >
                {t("cart")}
              </p>
              <div style={{ position: "relative" }}>
                <img src="../assets/images/cartWhite.svg" alt="cartIcon" />
                <span
                  className="text-white small"
                  style={{
                    paddingBottom: "14px !important",
                    position: "absolute",
                    left: 20,
                  }}
                >
                  {cartInLocal?.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Toaster />

      {showProfile && <UserProfile user={user} />}
      {showModal ? isSignIn && !forgotPwd ? <SignIn /> : <SignUp /> : ""}
      {showModal && forgotPwd ? <ForgotPasswordComponent /> : ""}
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
});

/**
 * Export
 */
export default withRouter(
  connect(mapStateToProps, {
    loginUser,
    resetPassword,
    createData,
    updateData,
  })(Header)
);
