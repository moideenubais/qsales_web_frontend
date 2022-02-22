import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";
import Product from "../Products/Product";
import Select from "react-select";

function CategoryContainer(props) {
  const { products, info, categoryData, handleOnFilterChange, shops, brands,loading } = props;
  const { resourceBundle } = categoryData || {};


  let Shops=shops.map(shop=>({label:shop.i18nResourceBundle.name,value:shop._id}));
  let Brands=brands.map(brand=>({label:brand.i18nResourceBundle.name,value:brand._id}));

  const [filterData, setFilterData] = useState({limit:10,page:1,sort_by:"newest",brand_id:"",shop_id:""});
  const [selectedFilter,setSelectedFilter]=useState("");
  const [selectedSubFilter,setSelectedSubFilter]=useState("");

  const handlePageClick = data => {
    let page=data.selected+1;
    setFilterData({...filterData,page:page});
  }

  useEffect(()=>{
    handleOnFilterChange(filterData)
  },[filterData])

  useEffect(()=>{
    let value=selectedFilter.value=="shop"?Shops.find(opt=>opt.value==filterData.shop_id):Brands.find(opt=>opt.value==filterData.brand_id);
    setSelectedSubFilter(value)
  },[selectedFilter])

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
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 pt-4 ">
            <h4 className="p-0 m-0">{title}</h4>
              <p className="p-0 m-0">{`${info?.totalNumber} Results for ${title}`}</p>
            <div className="border d-flex flex-row justify-content-between flex-wrap p-2">
              <div className="filter-container d-flex flex-row align-items-center">
              <span className="mx-2">Filter By:</span>
              <Select
                placeholder="Shop/Brand"
                value={selectedFilter}
                onChange={(data) => setSelectedFilter(data)}
                options={filterOptions}
                className="sortby-select"
              />
              <Select
                placeholder="Select Item"
                value={selectedSubFilter || ""}
                onChange={(data) => {handleOnChange(selectedFilter.value=="shop"?"shop_id":"brand_id", data?.value);setSelectedSubFilter(data);}}
                options={selectedFilter.value=="shop"?Shops:selectedFilter.value=="brand"?Brands:[]}
                className="sortby-select filter-select"
                styles={{control: styles => ({ ...styles, whiteSpace:"nowrap" })}}
              />
              <button className="btn btn-danger reset-btn" onClick={()=>{setFilterData({...filterData,brand_id:"",shop_id:""});setSelectedSubFilter("")}} >Reset</button>
              </div>
              <div className="sorting-container d-flex flex-row align-items-center">
              <span className="mx-2">Sort By:</span>
              <Select
                value={options.find(opt=>opt.value==filterData.sort_by)}
                onChange={(data) => handleOnChange("sort_by", data?.value)}
                options={options}
                className="sortby-select"
                styles={{control: styles => ({ ...styles, whiteSpace:"nowrap" })}}
              />
              </div>
            </div>
            {(products.length>0 && !loading) ? <>

            
            <div className="p-4 border p-2 d-flex flex-row">
              {/* Title of Product Container */}

              {/* List of product */}
              <div className="col-12 bg-white d-flex flex-row justify-content-xs-between justify-content-start flex-wrap flex-md-wrap">
                {console.log("Products",products)}
                {products.map(
                  (
                    {
                      name,
                      rating,
                      description,
                      price,
                      product_image_small_url,
                      _id,
                      discount_type,
                      discount_amount,
                      flash
                    },
                    index
                  ) => {
                    return (
                        <Product
                          _id={_id}
                          key={index}
                          productName={name}
                          rating={rating}
                          description={description}
                          productImage={product_image_small_url}
                          price={price?.unit_price}
                          discountAmount={flash?.discount_amount || price?.discount_amount}
                          discountType={flash?.discount_type || price?.discount_type}
                          classes="product-card-extention"
                        />
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
            </>:
            (
              <div className="col-12 bg-white d-flex flex-row justify-content-center flex-wrap flex-md-wrap">
                No data found
              </div>
            )
            }
          </div>
      </div>
    </>
  );
}

export default CategoryContainer;
