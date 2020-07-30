import React, { Component } from 'react';
import Header from '../components/organizations/Header.js';
import OrgTable from '../components/organizations/OrgTable.js';

class Organizations extends Component {

    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <Header />
          <OrgTable addFavoriteHandler={() => this.props.addFavoriteHandler} />
        </div>
      )
    }
}

export default Organizations;