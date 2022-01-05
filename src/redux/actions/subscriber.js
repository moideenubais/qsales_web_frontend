/**
 * Create Data
 * @param {String} type type
 * @param {String} url url
 * @param {Object} data data
 * @param {Object} params parameters
 * @returns {*}
 */
 export function subscribeWithEmail(type, url, data) {
    return {
      type,
      payload: {
        request: {
          headers: { Authorization: localStorage.jwtToken },
          method: "post",
          data,
          url
        },
      },
    };
  }