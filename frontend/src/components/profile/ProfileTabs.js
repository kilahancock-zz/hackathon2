import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PendingMatches from './PendingMatches.js';
import CompletedExchanges from './CompletedExchanges.js';
import MyOrganizations from './MyOrganizations.js';

class ProfileTabs extends Component {
  constructor (props) {
    super (props);
    this.state = {
      currentTab: 'requested'
    }
  }

  render() {
    return (
      <Tabs defaultActiveKey="pending" id="profileTabs" className="w-75 mt-5 px-5">
          <Tab eventKey="pending" title="Suggested Matches" className="mx-5">
            <PendingMatches claimItemHandler={this.props.claimItemHandler}/>
          </Tab>
          <Tab eventKey="complete" title="Completed Exchanges" className="mx-5">
            <CompletedExchanges />
          </Tab>
          <Tab eventKey="organizations" title="My Organizations" className="mx-5">
            <MyOrganizations />
          </Tab>
      </Tabs>
    );
  }
}

export default ProfileTabs;