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
    brandReducer,
    shopReducer
  } = props;

  useEffect(() => {
    propsGetData(ActionTypes.GET_CATEGORY_DETAILS, `/category/${categoryId}`);
  }, [propsGetData, categoryId]);

  const handleOnFilterChange = (filter) => {
    propsGetData(ActionTypes.GET_PRODUCTS, "/product", {
      category_id: categoryId,
      ...filter,
    });
  };
  return (
    <CategoryContainer
      key={categoryId}
      products={productReducer?.data?.products || []}
      info={productReducer?.data?.info || {}}
      categoryData={cateogryReducer?.data || {}}
      brands={brandReducer?.data?.brands || []}
      shops={shopReducer?.data?.shops || []}
      handleOnFilterChange={handleOnFilterChange}
      loading={productReducer.loading}
    />
  );
}

const mapStateToProps = (state) => ({
  productReducer: state.getAllProductsReducer,
  cateogryReducer: state.getCategoryDetailsReducer,
  shopReducer:state.getAllShopsReducer,
  brandReducer:state.getAllBrandsReducer,
});

export default connect(mapStateToProps, {
  getData,
})(CategoryListHolder);
