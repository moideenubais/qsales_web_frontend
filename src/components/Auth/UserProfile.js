import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateData, getData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";
import { isEmptyObj } from "../../heper";

import { connect, useDispatch } from "react-redux";
import { getUser, setCurrentUser } from "../../redux/actions/auth";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";

const UserProfile = (props) => {
  const { user, errors: userErrors, orderReducer } = props;
  const orders = orderReducer?.data?.orders;
  const dispatch = useDispatch();
  const [hasRendered, setHasRendered] = React.useState(false);
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
    if (!hasRendered) {
      props.getData(ActionTypes.GET_ORDERS, `/order`, { user_id: user._id });
      setHasRendered(true);
    }
  }, [hasRendered]);

  useEffect(() => {
    if (!userErrors?.msg) return;
    setError("email", { type: "manual", message: userErrors.msg });
  }, [setError]);

  const updateUser = (userData) => {
    if (isEmptyObj(errors)) return;
    let id = userData._id;
    userData?.shop_id==null && delete userData?.shop_id
    userData?.address?.length && delete userData?.address[0]?._id;
    userData?._id && delete userData?._id;
    userData?.role && delete userData?.role;
    userData?.iat && delete userData?.iat;
    userData?.cart && delete userData?.cart;
    props
      .updateData(ActionTypes.CREATE_USER, `/user/${id}`, {
        ...userData,
      })
      .then((result) => {
        if (result?.error) return;
        getUser(id).then(res=>{
        dispatch(setCurrentUser({ decoded:res.data, token: result.payload.data.token }));
        toast.success("Profile Updated");
        props.setIsSignIn(true);
        });
        
      });
  };

  console.log("orderReducer", user);
  return (
    <div className="shadow-lg col-12 bg-transparent-full">
      <div className="signIn-model col-lg-3 col-md-5 col-sm-8 p-4 bg-white rounded shadow-lg border">
        <div className="my-2 d-flex flex-row justify-content-between">
          <div className="">
            <h6 className="mb-2">Profile</h6>
          </div>
          <button
            type="button"
            className="bg-white border-0 fs-4 p-0 m-0 animate-close"
            onClick={() => {
              props.setShowProfile(false);
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
                minLength: 10,
                maxLength: 10,
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
            <button type="submit" className=" btn btn-qs-primary mt-2 p-2 me-5">
              Update
            </button>
          </div>
        </form>
        <div>
          {orders?.length && user._id==orders[0].customer_id._id &&(
            <table className="table table-responsive table-striped table-sm table-bordered">
              <thead>
                <th>Order Code</th>
                <th>Status</th>
              </thead>
              <tbody>
                {orders?.length > 0 &&
                  orders.map((order) => (
                    <>
                      <tr>
                        <td>{order.order_code}</td>
                        <td>{order.order_status}</td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state.authReducer,
  orderReducer: state.getAllOrdersReducer,
});

export default connect(mapStateToProps, {
  getData,
  updateData,
})(UserProfile);
