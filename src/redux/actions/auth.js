import axios from "axios";
import jwtDecode from "jwt-decode";
import { ActionTypes } from "../contants/action-types";
import toast from "react-hot-toast";

/**
 * Set current user
 * @constant
 * @param {*} decoded doceded
 * @returns {*}
 */
export const setCurrentUser = (decoded) => ({
  type: ActionTypes.SET_CURRENT_USER,
  payload: decoded,
});

/**
 *
 * @param {*} token
 */
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

/**
 * Login User
 * @constant
 * @param {*} user user detail
 * @returns {*}
 */
export const loginUser = (user) => (dispatch) => {
  return new Promise((resolve) => {
    axios
      .post("/login", user)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded));
        toast.success("Logged In");
        resolve(true);
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.GET_AUTH_ERRORS,
          payload: err.response.data,
        });
      });
  });
};

/**
 * Logout user
 * @constant
 * @returns {*}
 */
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

/**
 * Reset Password
 * @constant
 * @param {*} data reset password data
 * @returns {*}
 */
export const resetPassword = (data) => (dispatch) => {
  return new Promise((resolve) => {
    axios
      .post("/login/resetPassword", data)
      .then((response) => {
        toast.success("Mail has been send");
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.GET_AUTH_ERRORS,
        });
      });
  });
};

/**
 * Reset Password
 * @constant
 * @param {*} data reset password data
 * @returns {*}
 */
export const changePassword = (data) => (dispatch) => {
  axios
    .post("/login/changePassword", data)
    .then(() => {})
    .catch((err) => {
      dispatch({
        type: ActionTypes.GET_AUTH_ERRORS,
      });
    });
};
