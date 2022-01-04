import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Navigation(props) {
  const { categoryReducer } = props;
  const { categories = [] } = categoryReducer?.data || {};

  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12 bg-light">
        <div className="col-lg-9 col-md-9 col-sm-12 mx-auto d-flex align-items-center flex-row  flex-wrap justify-content-start">
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
});

export default connect(mapStateToProps, {})(Navigation);
