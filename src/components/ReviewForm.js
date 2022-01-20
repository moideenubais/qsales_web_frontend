import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactStars from "react-stars";

const ReviewForm = (props) => {
    console.log("Review",props.order)
    const [ratings,setRatings]=useState(1);
    const [message,setMessage]=useState("");

    const handleSubmit=()=>{

        const review={ 
        order_id:props.order._id, 
        product_id:props.productId,
        customer_name:props.order.customer_name,
        customer_id:props.order.customer_id._id, 
        rating: ratings,
        comment: message }

        axios.post('/review',review).then(res=>{
            toast.success("Successfully Submitted"
                , { className:"my-toast" }
                );
        }).catch(err=>{
            toast.success("Error while submitting"
            , { className:"my-toast" }
            );
        })
        // console.log("Rating:",ratings);
        // console.log("message",message);
    }
  return (
    <div className="card my-2 w-100">
      <div className="card-header">Post Review</div>
      <div className="card-body m-1">
        <textarea className="w-100 p-2" value={message} onChange={e=>setMessage(e.target.value)} rows="4" placeholder="Optional" />
        <ReactStars
          count={5}
          value={ratings}
          edit={true}
          onChange={setRatings}
          size={20}
          color2={"#ffd700"}
          min={1}
        />
        <button className="btn btn-qs-primary p-2 float-end m-2"
        onClick={handleSubmit}
        >Submit</button>
      </div>
    </div>
  );
};

export default ReviewForm;
