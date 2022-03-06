import React, { useEffect } from "react";
import { Accordion, Dropdown, DropdownButton } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getData } from "../redux/actions";
import { ActionTypes } from "../redux/contants/action-types";

function MobileNavigation(props) {
  const { categoryReducer, brandReducer, shopReducer } = props;
  const { categories = [] } = categoryReducer?.data || {};
  // const dispatch= useDispatch()
  useEffect(() => {
    props.getData(ActionTypes.GET_BRANDS, "/brand");
    props.getData(ActionTypes.GET_SHOPS, "/shop");
  }, []);
  let allBrands=brandReducer?.data?.brands?.map(brand=>({name:brand.i18nResourceBundle.name,value:brand._id}));
  let allShops=shopReducer?.data?.shops?.map(shop=>({name:shop.i18nResourceBundle.name,value:shop._id}));
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>All Categories</Accordion.Header>
          <Accordion.Body>
            <ul>
              {categories.map((cat) => (
                <li>
                  <a href={`/category/${cat._id}`}>
                    {cat.i18nResourceBundle.name}
                  </a>
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>All Brands</Accordion.Header>
          <Accordion.Body>
           <ul>
           {allBrands?.map((brand) => (
                <li>
                 <a href={`/brand/${brand.value}`}>{brand.name}</a> 
                </li>
              ))}
           </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>All Shops</Accordion.Header>
          <Accordion.Body>
           <ul>
           {allShops?.map((shop) => (
                <li >
                  <a href={`/shop/${shop.value}`}>{shop.name}</a>
                </li>
              ))}
           </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

const mapStateToProps = (state) => ({
  categoryReducer: state.getAllCategoriesReducer,
  brandReducer:state.getAllBrandsReducer,
  shopReducer:state.getAllShopsReducer
});

export default connect(mapStateToProps, {getData})(MobileNavigation);
