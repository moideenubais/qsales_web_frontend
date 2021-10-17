import { ActionTypes } from "../contants/action-types";

/**
 * initial state
 * @constant
 */
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  errors: null,
};

/**
 * Auth reducer
 * @param {*} state state
 * @param {*} action action
 * @returns {*}
 */
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload?._id,
        user: action.payload,
      };
    case ActionTypes.GET_AUTH_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};
