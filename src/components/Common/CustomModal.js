import React from "react";
import Parser from 'html-react-parser';

const CustomModal = (props) => {
  return (
    <div className="shadow-lg col-12 bg-transparent-full">
      <div className="signIn-model col-lg-8 col-md-5 col-sm-8 p-4 bg-white rounded shadow-lg border custom-modal">
        <div className="my-2 d-flex flex-row justify-content-between">
          <div className="">
            <h6 className="mb-2">{props.title}</h6>
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
        <div>{Parser(props.children)}</div>
      </div>
    </div>
  );
};

export default CustomModal;
