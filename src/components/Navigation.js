import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Navigation(props) {
  const { categoryReducer } = props;
  const { categories = [] } = categoryReducer?.data || {};

  return (
    <React.Fragment>
      <div className="col-lg-12 col-md-12 col-sm-12 bg-light">
        <div className="col-lg-9 col-md-9 col-sm-12 mx-auto d-flex align-items-center flex-row  flex-wrap justify-content-start">
          <div className="nav-list p-3 small ">
            <Link
              className="text-decoration-none"
              style={{ color: "#8f1d3f" }}
              to={{ pathname: `/` }}
            >
              <h6
                className="small nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                //   aria-haspopup="true"
                //   aria-expanded="false"
              >
                All Categories
              </h6>
            </Link>

            <div className="dropdown-menu">
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
          {categories.map((cat) => (
            <Link
              className="text-decoration-none"
              style={{ color: "#8f1d3f" }}
              to={{
                pathname: `/category/${cat._id}`,
              }}
            >
              <div className="nav-list p-3 small">
                <h6 className="small">{cat.i18nResourceBundle.name}</h6>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  categoryReducer: state.getAllCategoriesReducer,
});

export default connect(mapStateToProps, {})(Navigation);
