import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

const BrandsContainer = (props) => {
    const { getData: propsGetData, shopReducer } = props;

    const [allShops, setAllShops] = useState([]);
  
    useEffect(() => {
        if(!!!shopReducer?.data?.shops.length){
            propsGetData(ActionTypes.GET_SHOPS, "/shop");
        }
    }, [propsGetData]);
  
    useEffect(() => {
        setAllShops(shopReducer?.data?.shops || [])
    }, [shopReducer]);
  
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 3, itemsToScroll: 2, pagination: false },
        { width: 850, itemsToShow: 4 },
        { width: 1150, itemsToShow: 6, itemsToScroll: 2 },
        { width: 1450, itemsToShow: 6 },
        { width: 1750, itemsToShow: 6 },
      ];

    return (
      <>
       {allShops ? (
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          <div className="col-12 mx-auto pt-2 ">
            <div className="p-4 bg-white">
              <div className="py-4">
                <h4 className="p-0 m-0">Shops</h4>
              </div>
              <div className="d-flex flex-row justify-content-between flex-wrap flex-md-nowrap">
                <Carousel breakPoints={breakPoints} pagination={false}>
                  {allShops?.map(
                    (
                      shop,
                      index
                    ) => {
                      return (
                        <Link
                          key={shop._id}
                          className="text-decoration-none"
                          to={{
                            pathname: `shop/${shop._id}`,
                            query: { id: shop._id },
                          }}
                        >
                          <>
                            <div className=" product p-3 rounded mx-1">
                              <div className="d-flex justify-content-center">
                                <img
                                  src={`${process.env.REACT_APP_IMAGE_URL}/${shop?.logo_url}`}
                                  alt="shop"
                                  className="img-fluid product-image"
                                />
                              </div>
                              <div className="pt-3 product-description">
                                <h6
                                  className="p-0 m-0 mb-1 text-dark "
                                  style={{
                                    // width: "150px",
                                    textOverflow: "ellipsis",
                                    textAlign: "center",
                                  }}
                                >
                                  {shop?.i18nResourceBundle.name}
                                </h6>
                              </div>
                            </div>
                          </>
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
    shopReducer:state.getAllShopsReducer
  });
  
  export default connect(mapStateToProps, {
    getData,
  })(BrandsContainer)
