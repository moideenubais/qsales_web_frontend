import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function ProductTabs() {
    return (
        <div>
<Tabs>
    <TabList>
      <Tab>Overview</Tab>
      <Tab>Review</Tab>
    </TabList>

    <TabPanel>
      <div className="p-2">
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
    <TabPanel>
      <h2 className="text-black-50">On progress</h2>
    </TabPanel>
  </Tabs>
        </div>
    )
}

export default ProductTabs
