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
                  className:"my-toast"
                }
                );
            }
        }).catch(error=>{
            toast.error(error.err || "Failed to Subscribe"
            , { 
              className:"my-toast"
            })
        })
      }

    return (
      <div className="mt-2 d-flex flex-row subscribe-container">
        <div className="col-md-6 col-sm-9 col-xs-9">
          <input 
          {...register('email',{ required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} 
          className="form-control subscribe-input" 
          placeholder="Subscribe with email" />
          <span className="text-danger">
          {errors.email?.type === 'required' && "email is required"}
          {errors.email?.type === 'pattern' && "invalid email"}
          </span>

        </div>
        <div className="col-md-6 col-sm-3 col-xs-3 mx-2 mx-2">
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
