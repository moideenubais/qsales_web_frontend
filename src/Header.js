import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';



function Header(props) {

    const [showModal,setShowModal] = React.useState(false);
    const [isSignIn,setIsSignIn] = React.useState(true);

    const toggleModel = () =>{
        setIsSignIn(value => !value);
    }

    console.log(isSignIn)

// SIGN IN COMPONENT   
const SignIn = () =>{
    const { register, handleSubmit,reset , formState: { errors } } = useForm();
    const onSignInSubmit = SignInData => console.log(SignInData);
    console.log(errors);

    return(
<div className="shadow-lg col-12 bg-transparent-full">
                        <div className="signIn-model col-3 p-4 bg-white rounded shadow-lg border">

                        <div className="my-2 d-flex flex-row justify-content-between">
                            <div className="">
                            <h6 className="mb-2">Welcome Back!</h6>
                            <h5 className="fw-bold">Sign in to your qsales account</h5>
                            </div>
                            <button type="button" className="bg-white border-0 fs-4 p-0 m-0 animate-close" onClick={()=>{setShowModal(false)}}>&#10005;</button>
                        </div>
                        <form onSubmit={handleSubmit(onSignInSubmit)} className="d-flex flex-column my-3">
                        <div className="form-group d-flex flex-column my-2">
                            <label className="small mb-1">Email</label>
                            <input className="qs-input p-2 rounded"type="email" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
                        </div>
                        <div className="form-group d-flex flex-column my-2">
                            <label className="small mb-1">Password</label>
                            <input className="qs-input p-2 rounded"  type="password" placeholder="Password" {...register("Password", {})} />
                        </div>
                        <div className="d-flex flex-row align-items-center">
                        <button type="submit" className="w-25 btn btn-qs-primary mt-2 p-2 me-5">Sign in</button>
                        <Link className="text-decoration-none">
                            <a className="small text-center text-decoration-none fw-normal">Forgot your Password ?</a>
                        </Link>
                        </div>
                        </form>
                        <hr className="text-secondary my-2"/>
                            <div className="">
                                <p className="small m-0 p-0">Dont have an account ? <span className="primary-color fw-normal cp"  onClick={()=>{setIsSignIn(false); reset({Email: "",Password:""})}}>Sign up</span></p>
                            </div>
                        </div>
            </div>
    )
}


// SIGN UP COMPONENT   
const SignUp = () =>{
    const { register, handleSubmit,reset , formState: { errors } } = useForm();
    const onSignUpSubmit = SignUpData => console.log(SignUpData);
    console.log(errors);

    return(
<div className="shadow-lg col-12 bg-transparent-full">
                        <div className="signIn-model col-3 p-4 bg-white rounded shadow-lg border">

                        <div className="my-2 d-flex flex-row justify-content-between">
                            <div className="">
                            <h6 className="mb-2">Welcome Back!</h6>
                            <h5 className="fw-bold">Create an qsales account</h5>
                            </div>
                            <button type="button" className="bg-white border-0 fs-4 p-0 m-0 animate-close" onClick={()=>{setShowModal(false)}}>&#10005;</button>
                        </div>
                        <form onSubmit={handleSubmit(onSignUpSubmit)} className="d-flex flex-column my-3">
                        <div className="form-group d-flex flex-column my-2">
                            <label for="formGroupExampleInput" className="small mb-1">Email</label>
                            <input className="qs-input p-2 rounded" id="formGroupExampleInput" type="email" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
                        </div>
                        <div className="form-group d-flex flex-column my-2">
                            <label for="formGroupExampleInput" className="small mb-1">Password</label>
                            <input className="qs-input p-2 rounded"  id="formGroupExampleInput" type="password" placeholder="Password" {...register("Password", {})} />
                        </div>
                        <div className="form-group d-flex flex-column my-2">
                            <label for="formGroupExampleInput" className="small mb-1">Confirm Password</label>
                            <input className="qs-input p-2 rounded"  id="formGroupExampleInput" type="password" placeholder="Password" {...register("ConfirmPassword", {})} />
                        </div>
                        <div className="d-flex flex-row align-items-center">
                        <button type="submit" className="w-25 btn btn-qs-primary mt-2 p-2 me-5">Sign Up</button>

                        </div>
                        </form>
                        <hr className="text-secondary my-2"/>
                            <div className="">
                                <p className="small m-0 p-0"> Already have an account ? <span className="primary-color fw-normal cp" onClick={()=>{setIsSignIn(true); reset({Email: "",Password:"",ConfirmPassword:""})}}>Sign In</span></p>
                            </div>
                        </div>
            </div>
    )
}

const ShowSignIn=()=>{
    return(
        isSignIn ? <SignIn/>: <SignUp/>
    )
}
    return (
        <React.Fragment>
            <header className="col-12 col-md-12 col-lg-12 border bg-primary">
                <div className="col-12 col-md-9 col-lg-9  mx-auto py-3 d-flex flex-row">
                    <div className="col-2 d-flex flex-row align-items-center justify-content-start">
                        {/* <h6 className="p-0 px-3 m-0 text-white">Qsales</h6> */}
                        <img src="../assets/images/4.png" height="70px" width="70px" className="position-absolute"/>
                    </div>
                    <div className="col-md-5 col-lg-5 p-0 d-flex flex-row align-items-center justify-content-center">
                        <input type="text" placeholder="What are you looking for ?" className="search border px-2 py-1 rounded w-100" />
                    </div>
                    <div className="col d-flex flex-row align-items-center justify-content-center">
                        <p className="text-white small p-0 m-0">العربية</p>
                    </div>
                    <div className="col-3 col-md-3 col-lg-3 d-flex flex-row align-items-center justify-content-center p-0">
                        <div className="d-flex flex-row align-items-center px-3 border-right">
                            <p className="text-white small p-0 m-0 mr-2 me-2" onClick={()=>{setShowModal(true)}}>Sign In </p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.123" height="16.123" viewBox="0 0 16.123 16.123">
                                <path id="Icon_material-person" data-name="Icon material-person" d="M14.062,14.062a4.031,4.031,0,1,0-4.031-4.031A4.03,4.03,0,0,0,14.062,14.062Zm0,2.015C11.371,16.077,6,17.427,6,20.108v2.015H22.123V20.108C22.123,17.427,16.752,16.077,14.062,16.077Z" transform="translate(-6 -6)" fill="#fff"/>
                            </svg>
                        </div>
                        <div className="d-flex flex-row align-items-center px-3">
                            <p className="text-white small p-0 m-0 mr-2 me-2">Cart</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18.066" height="17.313" viewBox="0 0 18.066 17.313">
                            <g id="Icon_feather-shopping-cart" data-name="Icon feather-shopping-cart" transform="translate(-0.75 -0.75)">
                                <path id="Path_4" data-name="Path 4" d="M13.506,30.753A.753.753,0,1,1,12.753,30,.753.753,0,0,1,13.506,30.753Z" transform="translate(-5.229 -14.193)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                <path id="Path_5" data-name="Path 5" d="M30.006,30.753A.753.753,0,1,1,29.253,30,.753.753,0,0,1,30.006,30.753Z" transform="translate(-13.446 -14.193)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                <path id="Path_6" data-name="Path 6" d="M1.5,1.5H4.512L6.53,11.583A1.506,1.506,0,0,0,8.036,12.8h7.319a1.506,1.506,0,0,0,1.506-1.212l1.2-6.318H5.265" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                            </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </header>
  
        {/* SIGN IN MODULE */}

                    {showModal ? isSignIn ? <SignIn/>:<SignUp/> :("")}
        </React.Fragment>
    )
}


export default Header;
