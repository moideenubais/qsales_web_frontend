import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { connect } from "react-redux";
import { getData } from "../redux/actions";
import { ActionTypes } from "../redux/contants/action-types";
import ReactStars from "react-stars";

function ProductTabs(props) {
  const {
    getData: propsGetData,
    reviewReducer,
    description,
    product_id,
    policy,
    warranty
  } = props;

  useEffect(() => {
    propsGetData(ActionTypes.GET_REVIEW, "review", { product_id });
  }, [propsGetData]);

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Review</Tab>
          <Tab>Refund Policy/Warranty</Tab>
        </TabList>

        <TabPanel>
          <div className="p-2">
            {description ? (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              "No overview found"
            )}
          </div>
        </TabPanel>
        <TabPanel>
          {reviewReducer.data?.reviews ? (
            <div className="w-100">
              {reviewReducer.data?.reviews.map(
                ({ customer_name, createdAt, rating, comment }) => (
                  <div class="card w-100 my-2">
                    <div className="card-header p-1">
                    {customer_name}
                    </div>
                    <div class="card-body">
                      <p class="card-text p-1">
                      {comment}
                      </p>
                      
                    </div>
                    <div class="card-footer d-flex flex-row justify-content-between p-1">
                      {/* <ReactStars
                        style={{ marginLeft: "10px" }}
                        count={5}
                        value={rating}
                        edit={false}
                        size={20}
                        color2={"#ffd700"}
                      /> */}
                      <div>
                      {new Date(createdAt).toDateString()}
                      </div>
                    </div>
                  </div>
                  // <div className=" p-3 rounded mx-1">
                  //   <div className="p-2 d-flex justify-content-between">
                  //     <div className="pt-1">{customer_name}</div>
                  //     
                  //   </div>
                  //   <div className="p-2">
                  //     {new Date(createdAt).toDateString()}
                  //   </div>
                  //   <div className="p-2">{comment}</div>
                  // </div>
                )
              )}
            </div>
          ) : (
            <div>{reviewReducer.data?.msg}</div>
          )}
        </TabPanel>
        <TabPanel>
          <table className="table table-light table-responsive table-borderless">
            <tbody>
              <tr>
                <td>Product Policy:</td>
                <td>{policy ? policy : "No Policy"}</td>
              </tr>
              <tr>
                <td>Warranty:</td>
                <td>{warranty ? warranty : "No Warranty Available"}</td>
              </tr>
            </tbody>
          </table>
        </TabPanel>
      </Tabs>
    </div>
  );
}

const mapStateToProps = (state) => ({
  reviewReducer: state.getReviewReducer,
});

export default connect(mapStateToProps, {
  getData,
})(ProductTabs);
