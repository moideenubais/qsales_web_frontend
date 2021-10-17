import React from "react";
import { Link } from "react-router-dom";
import Product from "../Products/Product";
import { useForm } from "react-hook-form";
import Select from "react-select";

function CategoryContainer(props) {
  const { products } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const options = [
    { value: "High to Low", label: "High to Low" },
    { value: "Low to High", label: "Low to High" },
  ];

  return (
    <>
      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9 mx-auto pt-4 ">
          {/* Product Container */}
          <div className="p-4 bg-white">
            {/* Title of Product Container */}
            <div className="border p-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Select
                  options={options}
                  {...register("sort by", { required: true })}
                />
                <input type="submit" />
              </form>
            </div>

            <div className="py-4">
              <h4 className="p-0 m-0">{"title"}</h4>
            </div>
            {/* List of product */}
            <div className="d-flex flex-row justify-content-xs-between justify-content-start flex-wrap flex-md-wrap">
              {products.map(
                (
                  {
                    productName,
                    rating,
                    description,
                    prices,
                    product_image_small_url,
                    id,
                  },
                  index
                ) => {
                  return (
                    <Link
                      className="text-decoration-none"
                      to={{
                        pathname: `/product/${id}`,
                        query: { id: id },
                      }}
                    >
                      <Product
                        key={index}
                        productName={productName}
                        rating={rating}
                        description={description}
                        productImage={product_image_small_url}
                        price={prices?.[0]?.unit_price}
                      />
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryContainer;
