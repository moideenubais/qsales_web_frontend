import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

const BrandsContainer = (props) => {
    const { getData: propsGetData, brandReducer } = props;

    const [allBrands, setAllBrands] = useState([]);
  
    useEffect(() => {
      propsGetData(ActionTypes.GET_BRANDS, "/brand");
    }, [propsGetData]);
  
    useEffect(() => {
      setAllBrands(brandReducer?.data?.brands || [])
    }, [brandReducer]);
  
    const breakPoints = [
        { width: 1, itemsToShow: 2 },
        { width: 550, itemsToShow: 3, itemsToScroll: 2, pagination: false },
        { width: 850, itemsToShow: 4 },
        { width: 1150, itemsToShow: 7, itemsToScroll: 2 },
        { width: 1450, itemsToShow: 5 },
        { width: 1750, itemsToShow: 6 },
      ];

    return (
      <>
       {allBrands ? (
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          <div className="col-12 col-sm-12 col-md-9 col-lg-9 mx-auto pt-4 ">
            <div className="p-4 bg-white">
              <div className="py-4">
                <h4 className="p-0 m-0">Brands</h4>
              </div>
              <div className="d-flex flex-row justify-content-between flex-wrap flex-md-nowrap">
                <Carousel breakPoints={breakPoints} pagination={false}>
                  {allBrands?.map(
                    (
                      brand,
                      index
                    ) => {
                      return (
                        <Link
                          key={brand._id}
                          className="text-decoration-none"
                          to={{
                            pathname: `brand/${brand._id}`,
                            query: { id: brand._id },
                          }}
                        >
                          <>
                            <div className=" product p-3 rounded mx-1">
                              <div className="d-flex justify-content-center">
                                <img
                                  src={`${process.env.REACT_APP_IMAGE_URL}/${brand?.logo_url}`}
                                  alt="product"
                                  className="img-fluid product-image"
                                />
                              </div>
                              <div className="pt-3 product-description">
                                <h6
                                  className="p-0 m-0 mb-1 text-dark "
                                  style={{
                                    width: "150px",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {brand?.i18nResourceBundle.name}
                                </h6>
                                {/* <p className="p-0 m-0 text-secondary fs-12">{description}</p> */}
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
    brandReducer:state.getAllBrandsReducer
  });
  
  export default connect(mapStateToProps, {
    getData,
  })(BrandsContainer)
