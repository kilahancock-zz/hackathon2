import React, { Component } from 'react';
import Header from '../components/community/Header.js'
import CommunityTabs from '../components/community/CommunityTabs.js';

class Community extends Component {
    render() {
      return (
        <div>
          <Header resourceClickHandler={this.props.resourceClickHandler}/>
          <CommunityTabs claimItemHandler={this.props.claimItemHandler} />
        </div>
      )
    }
}

export default Community;