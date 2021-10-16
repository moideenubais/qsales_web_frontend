import React, { useEffect } from "react";
import ProductsContainer from "./ProductsContainer";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";

function ProductsListHolder(props) {
  const { getData: propsGetData, categoryReducer } = props;

  useEffect(() => {
    propsGetData(ActionTypes.GET_CATEGORY, "/category");
  }, [propsGetData]);

  return (
    <>
      {categoryReducer?.data?.categories?.map((data, index) => {
        return (
          <ProductsContainer key={index} title={data.title} datas={data} />
        );
      })}
    </>
  );
}

const mapStateToProps = (state) => ({
  categoryReducer: state.getAllCategoriesReducer,
});

export default connect(mapStateToProps, {
  getData,
})(ProductsListHolder);
