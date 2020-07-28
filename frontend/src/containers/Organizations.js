import React, { Component } from 'react';
import Header from '../components/organizations/Header.js';
import OrgTable from '../components/organizations/OrgTable.js';

class Organizations extends Component {
    render() {
      return (
        <div>
          <Header />
          <OrgTable />
        </div>
      )
    }
}

export default Organizations;