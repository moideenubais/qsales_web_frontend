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
    const query = { user_type: "user", category_id: datas._id };
    if (!datas._id) {
      query[datas.type] = true;
      delete datas.category_id;
    }

    propsGetData(ActionTypes.GET_PRODUCTS, "/product", query).then((res) => {
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

  const getTime=()=>{
    const {$H:h1,$m:m1,$s:s1}=dayjs().endOf('day');
    const {$H:h2,$m:m2,$s:s2}=dayjs();
    return {h:h1-h2,m:m1-m2,s:s1-s2};
  }
  const [remainingTime,setRemainingTime]=useState(getTime());
  useEffect(()=>{
    setInterval(()=>{
      const time=getTime();
      setRemainingTime(time);
    },1000)
  },[])
  
  const {h,m,s}=remainingTime;
  return (
    <>
      {productsData ? (
        <div className="col-12">
          <div className="col-12 mx-auto pt-2 ">
            {/* Product Container */}
            <div className="p-4 bg-white">
              {/* Title of Product Container */}
              <div className="pb-4 d-flex flex-row justify-content-between">
                <h4 className="p-0 m-0">{datas.i18nResourceBundle.name}</h4>
                {datas.type=='todays_deal' && <h5 className="text-muted small"><DealTime h={h} m={m} s={s} /> </h5> }
                {datas._id ?<a style={{textDecoration:"none"}} href={`/category/${datas._id}`}>View All</a>:""}
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
                      },
                      index
                    ) => {
                      return (
                        <Link
                          key={_id}
                          className="text-decoration-none h-100"
                          to={{
                            pathname: `product/${_id}`,
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
                            discountType={price?.discount_type}
                            discountAmount={price?.discount_amount}
                          />
                        </Link>
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
