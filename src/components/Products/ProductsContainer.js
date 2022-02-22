import React, { useEffect, useState } from "react";
import Product from "./Product";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";
import { NavLink } from "react-bootstrap";
import dayjs from "dayjs";
import DealTime from "../Common/DealTime";

function ProductsContainer(props) {
  const { getData: propsGetData, datas } = props;

  const [productsData, setproductsData] = useState([]);

  useEffect(() => {
    if (!datas) return;
    const query = { user_type: "user", category_id: datas._id,limit:8,page:0 };
    if (!datas._id) {
      query[datas.type] = true;
      delete datas.category_id;
    }
    if(datas.duration) {
      delete datas.category_id;
    }
    propsGetData(ActionTypes.GET_PRODUCTS,datas.duration?`/flash/${datas._id}`:"/product", query).then((res) => {
      if (res.error) return;
      setproductsData(res.payload.data.products);
    });
  }, [propsGetData, datas]);

  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 4, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 5 },
    { width: 1150, itemsToShow: 6, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 6 },
    { width: 1750, itemsToShow: 7 },
  ];


  return (
    <>
      {productsData ? (
        <div className="col-12">
          <div className="col-12 mx-auto pt-2 ">
            {/* Product Container */}
            <div className="p-3 bg-white">
              {/* Title of Product Container */}
              <div className="pb-4 d-flex flex-row justify-content-between flex-wrap">
                <h4 className="p-0 m-0 products-container-title" >{datas?.i18nResourceBundle?.name || datas?.name}</h4>
                {productsData?.length && datas?.type=='todays_deal' && <h5 className="text-muted small"><DealTime daily={true} /> </h5> }
                {datas?.duration && <h5 className="text-muted small"><DealTime endDate={datas?.duration?.to} /> </h5> }
                {datas?.duration?<a style={{textDecoration:"none"}} href={`/deal/${datas._id}`}>View All</a>:""}
                {(datas?._id && !datas?.duration) ?<a style={{textDecoration:"none"}} href={`/category/${datas._id}`}>View All</a>:""}
              </div>
              {/* List of product */}
              <div className="d-flex flex-row justify-content-between flex-wrap flex-md-nowrap card-group">
                <Carousel breakPoints={breakPoints} pagination={false}>
                  {productsData.map(
                    (
                      {
                        name,
                        rating,
                        description,
                        price,
                        product_image_small_url,
                        _id,
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
                          />
                      );
                    }
                  )}
                  
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      ) : (
        []
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  productReducer: state.getAllProductsReducer,
});

export default connect(mapStateToProps, {
  getData,
})(ProductsContainer);
