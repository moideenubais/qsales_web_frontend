/**
 * Get Data
 * @param {String} type type
 * @param {String} url url
 * @param {Object} params parameters
 * @returns {*}
 */
export function getData(type, url, params) {
  return {
    type,
    payload: {
      request: {
        url,
        params: {
          ...params,
          user_type: "user",
          lang: localStorage.getItem("lang") || "en",
        },
      },
    },
  };
}

/**
 * Create Data
 * @param {String} type type
 * @param {String} url url
 * @param {Object} data data
 * @param {Object} params parameters
 * @returns {*}
 */
export function createData(type, url, data, params = {}) {
  return {
    type,
    payload: {
      request: {
        headers: { Authorization: localStorage.jwtToken },
        method: "post",
        data,
        url,
        params: {
          ...params,
          user_type: "user",
        },
      },
    },
  };
}

/**
 * Delete Data
 * @param {String} type type
 * @param {String} url url
 * @param {Object} params parameters
 * @returns {*}
 */
export function deleteData(type, url, params) {
  return {
    type,
    payload: {
      request: {
        url,
        method: "delete",
        params: {
          ...params,
          user_type: "user",
        },
      },
    },
  };
}

/**
 * Update Data
 * @param {String} type type
 * @param {String} url url
 * @param {*} data data
 * @param {Object} params parameters
 * @returns {*}
 */
export function updateData(type, url, data, params = {}) {
  return {
    type,
    payload: {
      request: {
        method: "put",
        data,
        url,
        params: {
          ...params,
          user_type: "user",
        },
      },
    },
  };
}

/**
 * Clear reducer
 * @param {String} type reducer type
 * @returns {*}
 */
export function clearReducer(type = "CLEAR_REDUCER") {
  return {
    type,
  };
}
