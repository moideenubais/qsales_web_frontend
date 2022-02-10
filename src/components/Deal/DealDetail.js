import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DealTime from '../Common/DealTime';
import Product from '../Products/Product';

const DealDetail = () => {
    const {dealID}=useParams();
    const [deal,setDeal]=useState(null);

    useEffect(()=>{
        axios.get(`/flash/${dealID}?user_type=user`).then(res=>{
            setDeal(res.data);
        })
    },[])

    



    if(!deal)
    return <>
    loading...
    </>

    return (
        <div>
            <div className="text-center mb-4">
                <img className="banner-cover" src={`${process.env.REACT_APP_IMAGE_URL}/${deal.banner_url}`} />    
            </div>
            <div className="time-container d-flex justify-content-center align-items-center mb-2">
            <DealTime endDate={deal?.duration?.to} />
            </div>
            <div className="p-4 col-12 bg-white d-flex flex-row  justify-content-center flex-wrap flex-md-wrap">
            {deal?.products?.map(
                  (
                    {
                      name,
                      rating,
                      description,
                      price,
                      product_image_small_url,
                      _id,
                      discount_type,
                      discount_amount
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
                          discountAmount={discount_amount}
                          discountType={discount_type}
                          classes="product-card-extention"
                        />
                    );
                  }
                )}
            </div>
        </div>
    )
}

export default DealDetail
