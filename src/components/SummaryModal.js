import React from "react";
import { Button, Modal } from "react-bootstrap";

const SummaryModal = ({summary}) => {
  return (
    <>
    <div className=" col-8 bg-transparent-full">
        <div className=" col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-4 p-4 bg-white rounded shadow-lg border">
        
          <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
          </Modal.Header>
        
        
          <Modal.Body>
          <span className="text-muted d-block">Order ID: {summary.order_code}</span>
          <span className="text-muted d-block">Status: {summary.order_status}</span>
          <span className="text-muted d-block">Total: {summary.products.map(p=>p.cost)?.reduce((init,next)=>init+next,0)}</span>
          <table className="table table-bordered">
              <thead>
                  <th>name</th>
                  <th className="m-2">quantity</th>
                  <th className="m-2">price</th>
              </thead>
              <tbody>
                  {summary.products?.map(product=>(<tr>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.cost}</td>
                  </tr>))}
              </tbody>
          </table>
        </Modal.Body>
        </div>
        </div>

      
   
    </>
  );
};

export default SummaryModal;
