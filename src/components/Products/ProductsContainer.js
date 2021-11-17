import React, { useEffect, useState } from "react";
import Product from "./Product";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from "../../redux/actions";
import { ActionTypes } from "../../redux/contants/action-types";

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
    { width: 550, itemsToShow: 3, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 4 },
    { width: 1150, itemsToShow: 7, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];

  return (
    <>
      {productsData ? (
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
                          className="text-decoration-none"
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
