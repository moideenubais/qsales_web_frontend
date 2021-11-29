import React, { useState } from "react";
import { Link } from "react-router-dom";
import Product from "../Products/Product";
// import Select from "react-select";

function CategoryContainer(props) {
  const { products, info, categoryData, handleOnFilterChange } = props;
  const { resourceBundle } = categoryData || {};

  const [filterData, setFilterData] = useState({});

  const { name: title } = resourceBundle?.[0] || {};

  const handleOnChange = (name, value) => {
    const updatedFilterData = { ...filterData, [name]: value };
    setFilterData(updatedFilterData);
    handleOnFilterChange(updatedFilterData);
  };

  const options = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "price_high_to_low", label: "High to Low" },
    { value: "price_low_to_high", label: "Low to High" },
  ];

  return (
    <>
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
        {products?.length > 0 ? (
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 pt-4 ">
            <div className="border d-flex flex-row justify-content-between">
              <h4 className="p-0 m-0">{title}</h4>
              <p className="p-0 m-0">{`${info?.totalNumber} Results for ${title}`}</p>
              {/* <Select
                placeholder="Sort By"
                className="col-2"
                name="sort_by"
                options={options}
                onChange={(data) => handleOnChange("sort_by", data?.value)}
                value={
                  filterData.sort_by
                    ? options.filter(
                        ({ value }) => value === filterData.sort_by
                      )[0]
                    : null
                }
              /> */}
            </div>
            <div className="p-4 border p-2 d-flex flex-row">
              {/* Title of Product Container */}

              {/* List of product */}
              <div className="col-12 bg-white d-flex flex-row justify-content-xs-between justify-content-start flex-wrap flex-md-wrap">
                {products.map(
                  (
                    {
                      name,
                      rating,
                      description,
                      price,
                      product_image_small_url,
                      _id,
                    },
                    index
                  ) => {
                    return (
                      <Link
                        className="text-decoration-none"
                        to={{
                          pathname: `/product/${_id}`,
                          query: { id: _id },
                        }}
                      >
                        <Product
                          key={index}
                          productName={name}
                          rating={rating}
                          description={description}
                          productImage={product_image_small_url}
                          price={price?.unit_price}
                        />
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="col-12 bg-white d-flex flex-row justify-content-center flex-wrap flex-md-wrap">
            No data found
          </div>
        )}
      </div>
    </>
  );
}

export default CategoryContainer;
