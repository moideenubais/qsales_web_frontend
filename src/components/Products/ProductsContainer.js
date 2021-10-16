import React, { useEffect } from "react";
import Product from "./Product";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";

function ProductsContainer(props) {
  const { getData: propsGetData, productReducer, datas } = props;

  useEffect(() => {
    propsGetData(ActionTypes.GET_PRODUCTS, "/product", {
      cateogry_id: datas._id,
      user_type: "user",
    });
  }, [propsGetData, datas]);

  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 3, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 4 },
    { width: 1150, itemsToShow: 7, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];

  return (
    <React.Fragment>
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
        <div className="col-12 col-sm-12 col-md-9 col-lg-9 mx-auto pt-4 ">
          {/* Product Container */}
          <div className="p-4 bg-white">
            {/* Title of Product Container */}
            <div className="py-4">
              <h4 className="p-0 m-0">{datas.i18nResourceBundle.name}</h4>
            </div>
            {/* List of product */}
            <div className="d-flex flex-row justify-content-between flex-wrap flex-md-nowrap">
              <Carousel breakPoints={breakPoints}>
                {productReducer?.data?.products
                  ? productReducer.data.products.map((items, index) => {
                      const {
                        i18nResourceBundle,
                        ratings,
                        description,
                        price,
                        _id,
                      } = items;
                      return (
                        <Link
                          key={_id}
                          className="text-decoration-none"
                          to={{
                            pathname: `product/${_id}`,
                            query: { id: _id },
                          }}
                        >
                          <Product
                            key={index}
                            productName={i18nResourceBundle.name}
                            ratings={ratings}
                            description={description}
                            productImage={items.product_image_small_url}
                            price={price}
                          />
                        </Link>
                      );
                    })
                  : []}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  productReducer: state.getAllProductsReducer,
});

export default connect(mapStateToProps, {
  getData,
})(ProductsContainer);
