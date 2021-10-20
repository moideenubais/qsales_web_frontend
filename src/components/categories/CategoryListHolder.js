import React, { useEffect } from "react";
import CategoryContainer from "./CategoryContainer";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";

function CategoryListHolder(props) {
  const {
    getData: propsGetData,
    productReducer,
    categoryId,
    cateogryReducer,
  } = props;

  useEffect(() => {
    propsGetData(ActionTypes.GET_CATEGORY_DETAILS, `/category/${categoryId}`);
    propsGetData(ActionTypes.GET_PRODUCTS, "/product", {
      category_id: categoryId,
      user_type: "user",
    });
  }, [propsGetData, categoryId]);

  return (
    <CategoryContainer
      key={categoryId}
      products={productReducer?.data?.products || []}
      categoryData={cateogryReducer?.data || {}}
    />
  );
}

const mapStateToProps = (state) => ({
  productReducer: state.getAllProductsReducer,
  cateogryReducer: state.getCategoryDetailsReducer,
});

export default connect(mapStateToProps, {
  getData,
})(CategoryListHolder);
