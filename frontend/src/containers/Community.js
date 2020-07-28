import React, { Component } from 'react';
import Header from '../components/community/Header.js'
import CommunityTabs from '../components/community/CommunityTabs.js';

class Community extends Component {
    render() {
      return (
        <div>
          <Header />
          <CommunityTabs />
        </div>
      )
    }
}

export default Community;