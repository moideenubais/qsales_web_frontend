export const isEmptyObj = (v) => {
  return typeof value === "object" && Object.keys(v).length === 0;
};

export const saveCartToLocalStorage = (data) => {
  let updateData = { [data.varient_id]: data };
  const oldData = JSON.parse(localStorage.getItem("cart") || "{}");
  if (!isEmptyObj(oldData)) {
    if (oldData[data.varient_id]) {
      data.quantity += oldData[data.varient_id].quantity;
    }
    updateData = { ...oldData, [data.varient_id]: data };
  }
  localStorage.setItem("cart", JSON.stringify(updateData));
};

export const getCartInLocalStorage = (data) => {
  const oldData = localStorage.getItem("cart");
  if (oldData && !isEmptyObj(JSON.parse(oldData))) {
    return JSON.parse(oldData);
  }
  return {};
};
