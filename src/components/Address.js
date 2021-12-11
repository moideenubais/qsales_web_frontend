import React from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { connect } from "react-redux";
import { getData } from "../redux/actions";

function Address(props) {
  const { userData, onChange } = props;
  const [selectedAddressIndex, setSelectedAddressIndex] = React.useState(0);
  const selectedAddressIndexRef = React.useRef(null);
  const [show, setShow] = React.useState(false);

  const displayAddress = () => {
    if (!userData?.data) return;

    const address = Object.values(userData.data.address[selectedAddressIndex]);
    if (!address) return;

    delete address._id;
    if (selectedAddressIndexRef.current !== selectedAddressIndex) {
      console.log({ address });
      selectedAddressIndexRef.current = selectedAddressIndex;
      onChange(address);
    }
    return address.slice(1, address.length).join(", ");
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header
        ref={(node) => {
          if (!node) return;
          node.style.setProperty("padding", "10px 20px", "important");
        }}
        style={{
          background: "#8f1d3f",
          color: "white",
        }}
      >
        Address
      </Popover.Header>
      <Popover.Body>
        <div className="col-12 p-3 align-items-start justify-content-start">
          {userData?.data?.address?.map((address, i) => (
            <div className="mb-3 border-bottom py-2 align-items-start justify-content-start">
              <div
                className="d-flex align-items-start justify-content-start"
                onClick={() => setSelectedAddressIndex(i)}
                ref={(node) => {
                  if (!node) return;
                  node.style.setProperty("cursor", "pointer", "important");
                }}
              >
                <input
                  className="form-check-input p-2 mt-1 me-3 align-self-start "
                  type="radio"
                  onChange={() => setSelectedAddressIndex(i)}
                  name="flexRadioDefault"
                  checked={selectedAddressIndex === i}
                  id="flexRadioDefault1"
                />
                <div className="">
                  <label className="p-2">
                    {Object.values(address)
                      .slice(1, Object.values(address).length)
                      .join(", ")}
                  </label>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex flex-row justify-content-end small gap-2">
            <button
              className="mr-3 btn btn-sm btn-qs-primary fw-normal p-2"
              onClick={() => setShow(false)}
            >
              Continue
            </button>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div className="mt-1">
        <p className="small my-2 d-flex flex-column">
          <span className="fw-normal mb-1">ADDRESS</span>
          <span className="small text-black-50">{displayAddress()}</span>
        </p>
        <OverlayTrigger
          trigger="click"
          placement="left"
          show={show}
          overlay={popover}
        >
          <button
            className="btn btn-dark btn-sm p-1 px-2 small my-2"
            onClick={() => setShow(!show)}
          >
            Change Address
          </button>
        </OverlayTrigger>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  userData: state.getUser,
});

export default connect(mapStateToProps, {
  getData,
})(Address);
