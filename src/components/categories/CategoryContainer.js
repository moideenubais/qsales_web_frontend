import React, { useState } from "react";
import { Link } from "react-router-dom";
import Product from "../Products/Product";
import Select from "react-select";

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
    { value: "highToLow", label: "High to Low" },
    { value: "lowToHigh", label: "Low to High" },
  ];

  return (
    <>
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 pt-4 ">
          {/* Product Container */}
          <div className="border d-flex flex-row justify-content-between">
            <h4 className="p-0 m-0">{title}</h4>
            <p className="p-0 m-0">{`${info?.totalNumber} Results for ${title}`}</p>
            <Select
              placeholder="Sort By"
              className="col-2"
              name="sortBy"
              options={options}
              onChange={(data) => handleOnChange("sortBy", data?.value)}
              value={filterData.sortBy}
            />
          </div>
          <div className="p-4 border p-2 d-flex flex-row">
            {/* Title of Product Container */}

            {/* List of product */}
            <div className="col-8 bg-white d-flex flex-row justify-content-xs-between justify-content-start flex-wrap flex-md-wrap">
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
      </div>
    </>
  );
}

export default CategoryContainer;
