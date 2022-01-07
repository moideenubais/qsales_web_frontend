export const isEmptyObj = (v) => {
  return typeof value === "object" && Object.keys(v).length === 0;
};

export const getCartInLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart") || "{}");
};

export const clearCartInLocalStorage = () => {
  return localStorage.clearItem("cart");
};

export const saveCartToLocalStorage = (data) => {
  let updateData = { [data.varient_id]: data };
  const oldData = getCartInLocalStorage();
  if (!isEmptyObj(oldData)) {
    if (oldData[data.varient_id]) {
      data.quantity += oldData[data.varient_id].quantity;
    }
    updateData = { ...oldData, [data.varient_id]: data };
  }
  localStorage.setItem("cart", JSON.stringify(updateData));
};

export const removeCartFromLocalStorage = (variant_id) => {
  const data = getCartInLocalStorage();
  delete data[variant_id];
  console.log({ variant_id, data });
  localStorage.setItem("cart", JSON.stringify(data));
};

export const validatePasswords = ({ password, confirm_password }, setError) => {
  if (!new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$").test(password)) {
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