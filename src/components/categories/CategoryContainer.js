import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";
import Product from "../Products/Product";
import Select from "react-select";

function CategoryContainer(props) {
  const { products, info, categoryData, handleOnFilterChange, shops, brands } = props;
  const { resourceBundle } = categoryData || {};


  let Shops=shops.map(shop=>({label:shop.i18nResourceBundle.name,value:shop._id}));
  let Brands=brands.map(brand=>({label:brand.i18nResourceBundle.name,value:brand._id}));
  console.log("Shops",Shops);
  console.log("Brands",Brands);
  const [filterData, setFilterData] = useState({limit:10,page:1,sort_by:"newest",brand_id:"",shop_id:""});

  // const [shops,setShops]=useState([]);
  // const [brands,setBrands]=useState([]);
  const [selectedFilter,setSelectedFilter]=useState("");
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

  console.log("SelectedFilter",selectedFilter)
  let offset=(filterData.page-1)*filterData.limit;
  return (
    <>
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 pt-4 ">
            <h4 className="p-0 m-0">{title}</h4>
              <p className="p-0 m-0">{`${info?.totalNumber} Results for ${title}`}</p>
            <div className="border d-flex flex-row justify-content-between p-2">
              <div className="d-flex flex-row align-items-center">
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
                value={selectedFilter.value=="shop"?Shops.find(opt=>opt.value==filterData.shop_id):Brands.find(opt=>opt.value==filterData.brand_id) || ""}
                onChange={(data) => handleOnChange(selectedFilter.value=="shop"?"shop_id":"brand_id", data?.value)}
                options={selectedFilter.value=="shop"?Shops:selectedFilter.value=="brand"?Brands:[]}
                className="sortby-select filter-select"
              />
              <button className="btn btn-danger reset-btn" onClick={()=>setFilterData({...filterData,brand_id:"",shop_id:""})} >Reset</button>
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
            {products.length>0 ? <>

            
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
