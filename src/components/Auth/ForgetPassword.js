import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../redux/actions/auth";
import { updateData, getData,createData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";
import { isEmptyObj, validatePasswords } from "../../heper";

import { connect } from "react-redux";

const ForgetPassword = (props) => {
    const {errors: userErrors}=props;
    
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
    } = useForm();

    const onForgotSubmit = (SignInData) => {
      props.resetPassword(SignInData).then(() => {
        props.setIsSignIn(true);
        props.setForgotPwd(false);
      });
    };

    useEffect(() => {
      if (!userErrors?.msg) return;
      setError("email", { type: "manual", message: userErrors.msg });
    }, [setError]);

    return (
      <div className="shadow-lg col-12 bg-transparent-full">
        <div className="signIn-model col-lg-3 col-md-5 col-sm-8 p-4 p-4 bg-white rounded shadow-lg border">
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
                props.setShowModal(false);
                props.setForgotPwd(false);
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
                  props.setIsSignIn(true);
                  props.setForgotPwd(false);
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

  const mapStateToProps = (state) => ({
    ...state.authReducer,
  });
  
  export default connect(mapStateToProps, {
    resetPassword,
    getData,
    updateData,
    createData
  })(ForgetPassword)
