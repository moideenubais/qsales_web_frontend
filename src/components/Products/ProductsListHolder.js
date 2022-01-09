import React, { useEffect, useState } from "react";
import ProductsContainer from "./ProductsContainer";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";
import CarouselHome from "../CarouselHome";

const otherCategories = [
  {
    i18nResourceBundle: {
      languageCode: "en",
      name: "Flash Deals",
    },
    type: "flash_deal",
  },
  {
    i18nResourceBundle: {
      languageCode: "en",
      name: "Featured Products",
    },
    type: "featured",
  },
  {
    i18nResourceBundle: {
      languageCode: "en",
      name: "Today’s Deal",
    },
    type: "todays_deal",
  },
];

function ProductsListHolder(props) {
  const { getData: propsGetData, categoryReducer } = props;

  const [allCategories, setAllCategories] = useState(otherCategories);

  const { categories = [] } = categoryReducer?.data || {};

  useEffect(() => {
    propsGetData(ActionTypes.GET_CATEGORY, "/category");
  }, [propsGetData]);

  useEffect(() => {
    setAllCategories(otherCategories.concat(categories));
  }, [categories]);

  return (
    <>
      {allCategories?.map((data, index) => {
        return (
          <>
          <ProductsContainer key={index} title={data.title} datas={data} />
          {(index+1)%4==0 ?
          <CarouselHome betweenCategories={true} />
          :""}
          </>
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
