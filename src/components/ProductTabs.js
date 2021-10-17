import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { connect } from "react-redux";
import { getData } from "../redux/actions";
import { ActionTypes } from "../redux/contants/action-types";

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
            {JSON.stringify({description})}
            <h5 className="fw-bold text-black-50 my-3">Highlights</h5>
            <ul className="px-3 small">
              <li>Features soft bristles that aid in effective cleaning</li>
              <li>Does not leave scratch marks</li>
              <li>Product resists chipping even through prolonged usage</li>
              <li>Replacement mesh scrubber heads are interchangeable</li>
              <li>Durable construction allows for long term use</li>
            </ul>
          </div>
        </TabPanel>
        <TabPanel>{JSON.stringify(reviewReducer)}</TabPanel>
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
