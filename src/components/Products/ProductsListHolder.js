import React, { useEffect, useState } from "react";
import ProductsContainer from "./ProductsContainer";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";
import CarouselHome from "../CarouselHome";

const otherCategories = [
  // {
  //   i18nResourceBundle: {
  //     languageCode: "en",
  //     name: "Flash Deals",
  //   },
  //   type: "flash_deal",
  // },
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
      name: "Deals",
    },
    type: "todays_deal",
  },
];

function ProductsListHolder(props) {
  const { getData: propsGetData, categoryReducer,flashDealReducer } = props;

  const [allCategories, setAllCategories] = useState(otherCategories);

  const { categories = [] } = categoryReducer?.data || {};
  let { flashs = [] } = flashDealReducer?.data || {};

  useEffect(() => {
    propsGetData(ActionTypes.GET_CATEGORY, "/category");
    propsGetData(ActionTypes.GET_ALL_FLASHDEAL, "/flash");
  }, [propsGetData]);

  useEffect(() => {
    if(categories && flashs){
      let date= Date.now();
      flashs=flashs.filter(flash=>(date > Date.parse(flash?.duration.from) && Date.parse(flash?.duration.to) > date ));
      setAllCategories(flashs.concat(otherCategories.concat(categories)));
    }
    
  }, [categories,flashs]);

  return (
    <>
      {allCategories?.map((data, index) => {
        return (
          <>
          <ProductsContainer key={index} title={data.title} datas={data} />
          {/* {(index+1)%4==0 ?
          <CarouselHome betweenCategories={true} />
          :""} */}
          </>
        );
      })}
    </>
  );
}

const mapStateToProps = (state) => ({
  categoryReducer: state.getAllCategoriesReducer,
  flashDealReducer:state.getAllFlashDealsReducer
});

export default connect(mapStateToProps, {
  getData,
})(ProductsListHolder);
