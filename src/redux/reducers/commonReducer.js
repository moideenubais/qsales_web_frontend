/**
 * initial state
 * @constant
 */
const initialState = {
  data: null,
  loading: false,
  error: null,
  metaData: {},
};

/**
 * Common reducer
 * @param {*} TYPE type
 * @returns {*}
 */
export default function commonReducers(TYPE) {
  return (state = initialState, action) => {
    const SUCCESS = `${TYPE}_SUCCESS`;
    const FAIL = `${TYPE}_FAIL`;
    switch (action.type) {
      case TYPE:
        return { ...state, loading: true };
      case SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload.data,
          metaData: action.payload.info,
        };
      case FAIL:
        return {
          ...state,
          loading: false,
          error: action.error.response?.data,
        };
      default:
        return state;
    }
  };
}
