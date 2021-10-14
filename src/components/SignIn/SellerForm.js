import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import toast, { Toaster } from 'react-hot-toast';

const SellerForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const notify = () => {
        toast.success('Qsales will be contacting you soon!', {
            duration: 5000});
        toast.success('Registered Successfully!', {
            duration: 1000});


    }


    console.log(errors);

    return (
        <React.Fragment> 
<Toaster
  position="top-left"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#8f1d3f',
      color: '#fff',
      padding:'16px'
    },
    // Default options for specific types
    success: {
      duration: 5000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
             <div className="shadow-lg col-12 bg-transparent-full">
            <div className="signIn-model col-3 col-xs-10 col-sm-8 col-md-6 col-lg-3 col-xl-3 p-4 bg-white rounded shadow-lg border">

            <div className="my-2 d-flex flex-row justify-content-between">
            <Modal.Header closeButton className="w-100 border-0 p-0 m-0">
                            <div className="">
                            <h6 className="mb-2">Welcome Seller!</h6>
                            <h5 className="fw-bold">Thank you for choosing <span className="primary-color">Qsales</span></h5>
                            </div>
                            </Modal.Header>
                        </div>
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column py-2">
            <div className="form-group d-flex flex-column my-2">
                <label for="formGroupExampleInput" className="small">Name</label>
                <input className="qs-input p-2" id="formGroupExampleInput" type="text" placeholder="Name" {...register("Name", {required: false})} />
            </div>
            <div className="form-group d-flex flex-column my-2">
                <label for="formGroupExampleInput" className="small">Email</label>
                <input className="qs-input p-2" id="formGroupExampleInput" type="email" placeholder="Email" {...register("Email", {required: false, pattern: /^\S+@\S+$/i})} />
            </div>
            <div className="form-group d-flex flex-column my-2">
                <label for="formGroupExampleInput" className="small">Password</label>
                <input className="qs-input p-2"  id="formGroupExampleInput" type="password" placeholder="Password" {...register("Password", {required: false})} />
            </div>
            <div className="form-group d-flex flex-column my-2">
                            <label for="formGroupExampleInput" className="small mb-1">Confirm Password</label>
                            <input className="qs-input p-2 rounded"  id="formGroupExampleInput" type="password" placeholder="Confirm Password" {...register("ConfirmPassword", {required: false})} />
            </div>

            <h6 className="mb-2 mt-3">Basic Details</h6>
            <div className="form-group d-flex flex-column my-2">
                <label for="formGroupExampleInput" className="small">Shop Name</label>
                <input className="qs-input p-2" id="formGroupExampleInput" type="text" placeholder="Shop name" {...register("ShopName", {required: false})} />
            </div>
            <div className="form-group d-flex flex-column my-2">
                <label for="formGroupExampleInput" className="small">Address</label>
                <input className="qs-input p-2" id="formGroupExampleInput" type="text" placeholder="Address" {...register("Address", {required: false})} />
            </div>
            <div className="form-group d-flex flex-column my-2">
                <label for="formGroupExampleInput" className="small">Pickup Point</label>
                <input className="qs-input p-2" id="formGroupExampleInput" type="text" placeholder="Pickup point" {...register("PickupPoint", {required: false})} />
            </div>
            <div className="form-group d-flex flex-column my-2">
                <label for="formGroupExampleInput" className="small">Mobile number</label>
                <input className="qs-input p-2" id="formGroupExampleInput" type="text" placeholder="Mobile number" {...register("mobile", {required: false})} />
            </div>

            <div className="d-flex flex-row align-items-center">
            <button type="submit" className="w-25 btn btn-qs-primary mt-2 p-2 me-5" onClick={notify}>Send</button>
            </div>
            </form>
            </div>
            </div>
        </React.Fragment>
    )
}

export default SellerForm
