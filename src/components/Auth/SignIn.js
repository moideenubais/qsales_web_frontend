import React, {useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../redux/actions/auth";
import { createData, updateData, getData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";
import axios from "axios";
import { isEmptyObj, validatePasswords,getCartInLocalStorage } from "../../heper";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SignIn = (props) => {
  const { loginUser, updateData,errors: userErrors, authReducer } = props;
  console.log("auth",authReducer);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSignInSubmit = (SignInData) => {
    setIsSubmitted(true);
    if (isEmptyObj(errors)) return;

    const isValid = validatePasswords(
      { password: SignInData.password },
      setError
    );
    if (!isValid) return;

    loginUser(SignInData).then((res) => {
      if (!res.error) {
        const cart = getCartInLocalStorage();
        setTimeout(() => {
          updateData("UPDATE_CART", `/user/cart`, {
            cart: Object.values(cart),
          });
        }, 1000);
      }
      props.setShowModal(false);
    });
  };

  useEffect(() => {
    if(!isSubmitted) return;
    if (!userErrors?.msg) return;
    setError("email", { type: "manual", message: userErrors.msg });
  }, [setError,userErrors]);

  return (
    <div className="shadow-lg col-12 bg-transparent-full">
      <div className="signIn-model col-lg-3 col-md-5 col-sm-8 p-4 bg-white rounded shadow-lg border">
        <div className="my-2 d-flex flex-row justify-content-between">
          <div className="">
            <h6 className="mb-2">Welcome Back!</h6>
            <h5 className="fw-bold">Sign in to your qsales account</h5>
          </div>
          <button
            type="button"
            className="bg-white border-0 fs-4 p-0 m-0 animate-close"
            onClick={() => {
              props.setShowModal(false);
            }}
          >
            &#10005;
          </button>
        </div>
        <div className="d-flex flex-column my-3">
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
            {errors.email && errors.email.type !== "manual" && (
              <p>{errors.email.message}</p>
            )}
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
          {errors.email && errors.email.type == "manual" && (
            <p>{errors.email.message}</p>
          )}
          <div className="d-flex flex-row align-items-center">
            <button
              onClick={handleSubmit(onSignInSubmit)}
              className="w-25 btn btn-qs-primary mt-2 p-2 me-5"
            >
              Sign in
            </button>
            <Link
              className="text-decoration-none"
              onClick={() => props.setForgotPwd(true)}
            >
              <a className="small text-center text-decoration-none fw-normal">
                Forgot your Password ?
              </a>
            </Link>
          </div>
        </div>
        <hr className="text-secondary my-2" />
        <div className="">
          <p className="small m-0 p-0">
            Dont have an account ?{" "}
            <span
              className="primary-color fw-normal cp"
              onClick={() => {
                props.setIsSignIn(false);
                props.setForgotPwd(false);
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

const mapStateToProps = (state) => ({
  ...state.authReducer,
});

export default connect(mapStateToProps, {
  loginUser,
  updateData,
})(SignIn);
