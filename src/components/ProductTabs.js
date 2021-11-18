import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { connect } from "react-redux";
import { getData } from "../redux/actions";
import { ActionTypes } from "../redux/contants/action-types";
import ReactStars from "react-stars";

function ProductTabs(props) {
  const { getData: propsGetData, reviewReducer, description } = props;

  useEffect(() => {
    propsGetData(ActionTypes.GET_REVIEW, "review");
  }, [propsGetData]);

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Review</Tab>
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
            <div className="d-flex flex-row  flex-wrap flex-md-nowrap">
              {reviewReducer.data?.reviews.map(({ customer_name, createdAt, rating, comment }) => (
                <div className=" p-3 rounded mx-1">
                  <div className="p-2 d-flex justify-content-between">
                    <div className="pt-1">{customer_name}</div>
                    <ReactStars
                      style={{ marginLeft: "10px" }}
                      count={5}
                      value={rating}
                      edit={false}
                      size={20}
                      color2={"#ffd700"}
                    />
                  </div>
                  <div className="p-2">{new Date(createdAt).toDateString()}</div>
                  <div className="p-2">{comment}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>{reviewReducer.data?.msg}</div>
          )}
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
