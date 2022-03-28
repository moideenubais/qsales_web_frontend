import { useTranslation } from "react-i18next";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { getDiscountedPrice } from "../heper";

const SummaryModal = ({ summary }) => {
  const { t } = useTranslation();
  const subTotal = summary.products
    .map((p) => p.cost)
    ?.reduce((init, next) => init + next, 0);
  return (
    <>
      <div className=" col-8 bg-transparent-full">
        <div className=" col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-4 p-4 bg-white rounded shadow-lg border">
          <Modal.Header closeButton>
            <Modal.Title>Order Summary</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <span className="text-muted d-block">
              Order ID: {summary.order_code}
            </span>
            <span className="text-muted d-block">
              Status: {summary.order_status}
            </span>
            <span className="text-muted d-block">
              Total: QAR {subTotal >= 35 ? subTotal : subTotal + 10}
            </span>
            <table className="table table-bordered ">
              <thead>
                <th className="p-2">name</th>
                <th className="m-2 p-2">quantity</th>
                <th className="m-2 p-2">price</th>
              </thead>
              <tbody>
                {summary.products?.map((product) => (
                  <tr>
                    <td className="p-2"> {product.name}</td>
                    <td className="p-2">{product.quantity}</td>
                    <td className="p-2">
                      {getDiscountedPrice(
                        product?.flash?.discount_type || product?.discount_type,
                        product?.flash?.discount_amount || product?.discount,
                        product.cost
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} className="p-2">
                    {t("shippingCharges")}
                  </td>
                  <td className="p-2">{subTotal >= 35 ? "Free" : 10}</td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
        </div>
      </div>
    </>
  );
};

export default SummaryModal;
