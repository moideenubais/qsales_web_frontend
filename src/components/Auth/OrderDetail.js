import React from 'react'
import { Link } from 'react-router-dom';

const OrderDetail = (props) => {

  const { products } = props.order;
  return (
    <div className="shadow-lg col-12 bg-transparent-full">
      <div className="signIn-model col-lg-10 col-md-10 col-sm-10 p-4 bg-white rounded shadow-lg border">
        <div className="my-2 d-flex flex-row justify-content-between">
          <div className="">
            <h6 className="mb-2">Order Detail</h6>
            {/* <h5 className="fw-bold">Sign in to your qsales account</h5> */}
          </div>
          <button
            type="button"
            className="bg-white border-0 fs-4 p-0 m-0 animate-close"
            onClick={() => {
              props.setShowModal(false);
            }}
          >
            &#10005;
          </button>
        </div>
        <span className="py-2 text-muted">Status: {props.order.order_status}</span>
        <table className="table table-responsive table-striped table-bordered ">
          <thead>
            <th>Product Name</th>
            <th>Quanitity</th>
            {/* <th>Status</th> */}
            <th>Review</th>
          </thead>
          <tbody>
            {
              products.map(product => (
                <tr>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>
                    {props.order.order_status === "completed" ?
                      <Link to={{ pathname: `/product/${product.product_id}`, state: { order: props.order } }}>Post a review</Link>
                      : "Order not completed"}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderDetail
