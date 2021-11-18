export const isEmptyObj = (v) => {
  return typeof value === "object" && Object.keys(v).length === 0;
};

export const saveCartToLocalStorage = (data) => {
  let updateData = { [data.varient_id]: data };
  const oldData = localStorage.getItem("cart");
  if (oldData && !isEmptyObj(JSON.parse(oldData))) {
    updateData = { ...JSON.parse(oldData), ...updateData };
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
