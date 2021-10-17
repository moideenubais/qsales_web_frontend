import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

function CheckoutSteps(props) {
  const { user, isAuthenticated } = props;
  const { register, handleSubmit } = useForm();
  const [result, setResult] = React.useState("");
  const onSubmit = (data) => setResult(JSON.stringify(data));
  // const cartData = localStorage.getItem("cart")

  return (
    <React.Fragment>
      <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-4 ">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Login</Accordion.Header>
            <Accordion.Body className="p-3">
              <div className="col-12">
                {isAuthenticated ? (
                  <div className="">
                    <p className="d-flex flex-column">
                      <span className="fw-normal ">
                        Name :
                        <span className="primary-color fw-normal">
                          {user.name}
                        </span>
                      </span>
                      <span className="fw-normal mt-2">
                        Phone :
                        <span className="primary-color fw-normal">
                          {user.mobile}
                        </span>
                      </span>

                      <div className="d-flex flex-row justify-content-between mt-2 ">
                        <p className="fw-normal primary-color p-2 px-0 w-50">
                          <u>Logout & SignIn to another account</u>
                        </p>
                        <button className="btn btn-sm btn-qs-primary fw-normal p-2 w-25 small">
                          Continue Checkout
                        </button>
                      </div>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      {...register("firstName")}
                      placeholder="First name"
                    />
                    <input {...register("lastName")} placeholder="Last name" />
                    <p>{result}</p>
                    <button type="submit">Login</button>
                  </form>
                )}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Delivery Address</Accordion.Header>
            <Accordion.Body className="p-3">
              <div className="col-12 align-items-start justify-content-start">
                <div className="mb-3 border-bottom py-2 d-flex flex-row align-items-start justify-content-start">
                  <div className="form-check d-flex flex-row align-items-start justify-content-start">
                    <input
                      className="form-check-input p-2 mt-1 me-3 align-self-start"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label pe-5 small"
                      for="flexRadioDefault1"
                    >
                      KDS Bldg, Near MIDMAC Roundabou , Landmark Mall, Shafi
                      Street, Shafi Street, P.O. Box: 9440, Doha , Qatar
                    </label>
                    <div className="align-content-end">
                      <p className="p-0 m-0 primary-color">Edit</p>
                    </div>
                  </div>
                </div>

                <div className="mb-3 border-bottom py-2 d-flex flex-row align-items-start justify-content-start">
                  <div className="form-check d-flex flex-row align-items-start justify-content-start">
                    <input
                      className="form-check-input p-2 mt-1 me-3 align-self-start"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label pe-5 small"
                      for="flexRadioDefault1"
                    >
                      Bldg 59, Al Rawabi St, al abdulghani Towers, Muntazah
                      Area, Muntazah Area, airport road, Doha, Doha , Qatar
                    </label>
                    <div className="align-content-end">
                      <p className="p-0 m-0 primary-color">Edit</p>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-end small">
                  <button className="btn btn-sm btn-qs-primary fw-normal p-2 w-25 small">
                    Deliver Here
                  </button>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Order Summary</Accordion.Header>
            <Accordion.Body className="p-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Payment Options</Accordion.Header>
            <Accordion.Body className="p-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </React.Fragment>
  );
}

/**
 * map State To Props
 * @constant
 * @param {*} state state
 */
const mapStateToProps = (state) => ({
  ...state.authReducer,
});

/**
 * Export
 */
export default connect(mapStateToProps, {})(CheckoutSteps);
