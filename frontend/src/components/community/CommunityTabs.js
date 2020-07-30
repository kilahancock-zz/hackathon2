import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import RequestedTable from './RequestedTable.js';
import AvailableTable from './AvailableTable.js';


class CommunityTabs extends Component {
  constructor (props) {
    super (props);
    this.state = {
      currentTab: 'requested',
    }
  }

  render() {
    return (
      <Tabs defaultActiveKey="requested" id="communityTabs" className="w-75 mt-5 px-5">
          <Tab eventKey="requested" title="Requested" className="mx-5">
              <RequestedTable />
          </Tab>
          <Tab eventKey="available" title="Available" className="mx-5">
              <AvailableTable claimItemHandler={this.props.claimItemHandler} />
          </Tab>
      </Tabs>
    );
  }
}

export default CommunityTabs;