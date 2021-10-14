import React from 'react'
import { Link } from 'react-router-dom'
import SellerForm from './components/SignIn/SellerForm';
import Modal from 'react-bootstrap/Modal'

function Footer() {
    const [showModal,setShowModal] = React.useState(false);
    const [show, setShow] = React.useState(false);
    return (
        <React.Fragment>
            {/* This is for displaying seller form*/}
                           <Modal
                          show={show}
                          onHide={() => setShow(false)}
                          dialogClassName="modal-90w"
                          aria-labelledby="Seller form"
                          centered
                          animation={false}
                        >
                            <SellerForm closeButton/>
                        </Modal> 
            <div className="col-12 bg-light border py-5 mt-4">

                <div className="col-9 mx-auto d-flex flex-row  pb-4">
                    <div className="col-6">    
                        <h5 className="fs-5 fw-bold mb-2">We're Always Here To Help</h5>
                        <p className="small text-secondary">Reach out to us through any of these support channels</p>
                   
                        <div className="small mt-4 d-flex flex-row">
                            <div className=" border-start border-4 ps-3">   
                                <h6 className="small fw-normal">Help Center</h6>  
                                <p className="small text-secondary">help.qsales.com</p>        
                            </div>
                            <div className="ms-5 border-start border-4 ps-3">   
                                <h6 className="small fw-normal">Customer Support</h6>  
                                <p className="small text-secondary">customer.qsales.com</p>        
                            </div>
                        </div>
                    </div>
                    <div className="col-6 border-start ps-5 d-flex flex-column">
                        <h6 className="fs-5 fw-bold mb-2">Download our app</h6>
                        <p className="small text-secondary ">Get offers on our qsales app</p>
                        <div className="mt-4">
                            <img src="../assets/images/app-store.svg" className=""/>
                            <img src="../assets/images/google-play.svg" className="ms-3"/>

                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column col-9 mx-auto pt-3 border-top">

                <div className="col-6 d-flex flex-row flex-wrap justify-content-between text-decoration-none ">
                        <Link to="/Product" className="small text-secondary text-decoration-none">
                            <p className="small">Privacy Policy</p>
                        </Link>
                        <Link to="/Product" className="small text-secondary text-decoration-none">
                            <p className="small text-decoration-none">Terms of use</p>
                        </Link>
                        <Link to="" className="small text-secondary text-decoration-none">
                            <p className="small text-decoration-none" onClick={() => setShow(true)}>Sell with us</p>
                        </Link>
                        <Link to="" className="small text-secondary text-decoration-none">
                            <p className="small text-decoration-none">Warranty Policy</p>
                        </Link>
                        <Link to="" className="small text-secondary text-decoration-none">
                            <p className="small text-decoration-none">Terms of sale</p>
                        </Link>
                    </div>
                <div className="col-4 d-flex justify-content-start mt-4">
                    <p className="small text-secondary">
                        <span class="small">© 2021 Qsales. All Rights Reserved</span>
                    </p>
                </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Footer
