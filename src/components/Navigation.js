import React, { useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getData } from "../redux/actions";
import { ActionTypes } from "../redux/contants/action-types";

function Navigation(props) {
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
      <div className="col-lg-12 col-md-12 col-sm-12 bg-light">
        <div className="col-lg-9 col-md-9 col-sm-12 mx-auto d-flex align-items-center flex-row  flex-wrap justify-content-start">
          {/* Catagories DropDown */}
          <div className="nav-list p-3 small navdropdown">
            <DropdownButton id="dropdown-basic-button" title="All Categories">
              <Dropdown.Item href="/">All Categories</Dropdown.Item>
              {categories.map((cat) => (
                <Dropdown.Item href={`/category/${cat._id}`}>
                  {cat.i18nResourceBundle.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <div className="dropdown-menu px-4">
              <select
                className="py-1 px-3 form-select"
                aria-label="Default select example"
              >
                {categories.map((cat) => (
                  <option value={cat.i18nResourceBundle.id}>
                    {cat.i18nResourceBundle.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Brands DropDown */}
          <div className="nav-list p-3 small navdropdown">
            <DropdownButton id="dropdown-basic-button" title="Brands">
              {allBrands?.map((brand) => (
                <Dropdown.Item href={`/brand/${brand.value}`}>
                  {brand.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
          {/* Catagories DropDown */}
          <div className="nav-list p-3 small navdropdown">
            <DropdownButton id="dropdown-basic-button" title="Shops">
              {allShops?.map((shop) => (
                <Dropdown.Item href={`/shop/${shop.value}`}>
                  {shop.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <div className="dropdown-menu px-4">
              <select
                className="py-1 px-3 form-select"
                aria-label="Default select example"
              >
                {categories.map((cat) => (
                  <option value={cat.i18nResourceBundle.id}>
                    {cat.i18nResourceBundle.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {categories.slice(0, 6).map((cat) => (
            <Link
              className="text-decoration-none"
              style={{ color: "#8f1d3f" }}
              to={{
                pathname: `/category/${cat._id}`,
              }}
            >
              <div className="nav-list p-3 small">
                <h6 style={{ fontSize: 14 }}>{cat.i18nResourceBundle.name}</h6>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  categoryReducer: state.getAllCategoriesReducer,
  brandReducer:state.getAllBrandsReducer,
  shopReducer:state.getAllShopsReducer
});

export default connect(mapStateToProps, {getData})(Navigation);
