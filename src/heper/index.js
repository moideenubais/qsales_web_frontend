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
