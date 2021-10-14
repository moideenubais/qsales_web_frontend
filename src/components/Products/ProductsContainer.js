import React, { useEffect, useState } from "react";
import Product from "./Product";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductsContainer(props) {
  // console.log(props.datas)
  const [Data, setData] = React.useState(null);
  console.log(Data);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      axios
        .get(
          `http://ec2-3-133-125-119.us-east-2.compute.amazonaws.com/api/product`,
          {
            params: { cateogry_id: props.datas._id, user_type: "user" },
          }
        )
        .then((response) => {
          if (response.data.products) setProducts(response.data.products);
          else setProducts(null);
          console.log(response.data);
        })
        .catch((err) => console.log(err));
      //   return datas;
    };

    getCategories();
  }, []);

  React.useEffect(() => {
    setData(props.datas);
  }, [props.datas]);

  const { title } = props;

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
              <h4 className="p-0 m-0">{props.datas.i18nResourceBundle.name}</h4>
            </div>
            {/* List of product */}
            <div className="d-flex flex-row justify-content-between flex-wrap flex-md-nowrap">
              <Carousel breakPoints={breakPoints}>
                {products &&
                  products.map((items, index) => {
                    const {
                      i18nResourceBundle,
                      ratings,
                      description,
                      price,
                      productImage,
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
                  })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductsContainer;
