import React from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios";
import toast from 'react-hot-toast';

const SubscriptionForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
        axios.post(`/subscriber`,data).then(res=>{
            if(res && res.status==200) {
                 toast.success("Successfully Subscribed"
                , {
                    style: {
                      border: "1px solid #713200",
                      padding: "16px",
                      color: "#713200",
                    },
                  }
                );
            }
        }).catch(error=>{
            toast.error(error.err || "Failed to Subscribe"
            , {
                style: {
                  border: "1px solid #713200",
                  padding: "16px",
                  color: "#713200",
                },
              })
        })
      }

    return (
      <div className="mt-2 d-flex flex-row subscribe-container">
        <div className="col-6">
          <input 
          {...register('email',{ required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} 
          className="form-control subscribe-input" 
          placeholder="Subscribe with your email" />
          <span className="text-danger">
          {errors.email?.type === 'required' && "email is required"}
          {errors.email?.type === 'pattern' && "invalid email"}
          </span>

        </div>
        <div className="col-6 mx-2">
          <button
            className="btn btn-secondary subscribe-btn px-2"
            onClick={handleSubmit(onSubmit)}
          >
            Subscribe
          </button>
        </div>
      </div>
    );
}

export default SubscriptionForm
