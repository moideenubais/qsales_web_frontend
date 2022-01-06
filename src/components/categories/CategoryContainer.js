import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";
import Product from "../Products/Product";
import Select from "react-select";

function CategoryContainer(props) {
  const { products, info, categoryData, handleOnFilterChange } = props;
  const { resourceBundle } = categoryData || {};

  const [filterData, setFilterData] = useState({limit:10,page:1,sort_by:"newest"});

  const handlePageClick = data => {
    let page=data.selected+1;
    setFilterData({...filterData,page:page});
  }

  useEffect(()=>{
    handleOnFilterChange(filterData)
  },[filterData])

  const { name: title } = resourceBundle?.[0] || {};

  const handleOnChange = (name, value) => {
    const updatedFilterData = { ...filterData,page:1, [name]: value };
    setFilterData(updatedFilterData);
  };

  const options = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "price_high_to_low", label: "High to Low" },
    { value: "price_low_to_high", label: "Low to High" },
  ];

  const filterOptions = [
    { value: "shop", label: "Shop" },
    { value: "brand", label: "Brand" }
  ];

  let offset=(filterData.page-1)*filterData.limit;
  return (
    <>
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
        {products?.length > 0 ? (
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 pt-4 ">
            <h4 className="p-0 m-0">{title}</h4>
              <p className="p-0 m-0">{`${info?.totalNumber} Results for ${title}`}</p>
            <div className="border d-flex flex-row justify-content-between p-2">
              <div className="d-flex flex-row align-items-center">
              <span className="mx-2">Filter By:</span>
              <Select
                // value={options.find(opt=>opt.value==filterData.sort_by)}
                onChange={(data) => handleOnChange("sort_by", data?.value)}
                options={filterOptions}
                className="sortby-select"
              />
              <Select
                // value={options.find(opt=>opt.value==filterData.sort_by)}
                onChange={(data) => handleOnChange("sort_by", data?.value)}
                options={filterOptions}
                className="sortby-select"
              />
              </div>
              <Select
                value={options.find(opt=>opt.value==filterData.sort_by)}
                onChange={(data) => handleOnChange("sort_by", data?.value)}
                options={options}
                className="sortby-select"
              />
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
            <div className="mx-auto d-flex justify-content-center">
              <Pagination
                limit={filterData.limit}
                offset={offset}
                totalPages={Math.ceil(info.totalNumber / filterData.limit)}
                handlePageClick={handlePageClick}
              />
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
