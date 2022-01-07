import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateData, getData,createData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";
import { isEmptyObj, validatePasswords } from "../../heper";

import { connect } from "react-redux";


const SignUp = (props) => {

  const {errors: userErrors}=props;
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

//   useEffect(() => {
//     if (!userErrors?.msg) return;
//     setError("email", { type: "manual", message: userErrors.msg });
//   }, [setError]);

  const onSignUpSubmit = (SignUpData) => {
    if (isEmptyObj(errors)) return;

    const { password, confirm_password } = SignUpData;

    const isValid = validatePasswords({ password, confirm_password }, setError);
    if (!isValid) return;

    props
      .createData(ActionTypes.CREATE_USER, "/user", {
        user_type: "user",
        ...SignUpData,
      })
      .then((result) => {
        if (isEmptyObj(result?.error)) return;
        props.setIsSignIn(true);
      });
  };

  return (
    <div className="shadow-lg col-12 bg-transparent-full">
      <div className="signIn-model col-lg-3 col-md-5 col-sm-8 p-4 bg-white rounded shadow-lg border">
        <div className="my-2 d-flex flex-row justify-content-between">
          <div className="">
            <h6 className="mb-2">Welcome Back!</h6>
            <h5 className="fw-bold">Create an qsales account</h5>
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
            {errors.email && errors.email.type !== "manual" && <p>{errors.email.message}</p>}
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
                props.setIsSignIn(true);
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

const mapStateToProps = (state) => ({
  ...state.authReducer,
});

export default connect(mapStateToProps, {
  getData,
  updateData,
  createData
})(SignUp);
