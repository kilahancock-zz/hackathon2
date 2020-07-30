import React, { Component } from 'react';
import Header from '../components/community/Header.js'
import CommunityTabs from '../components/community/CommunityTabs.js';

class Community extends Component {
  constructor(props) {
    super();
    this.state = {
      enteredZipcode: props.userZipcode
    }
  }
  render() {
    return (
      <div>
        <Header
          resourceClickHandler={this.props.resourceClickHandler}
          userZipcode={this.props.userZipcode}
          updateZip={this.onZipChange}
        />
        <CommunityTabs 
        claimItemHandler={this.props.claimItemHandler}
        zipcode={this.state.zipcode}
        requests={this.props.requests}
        donations={this.props.donations}
         />
      </div>
    )
  }

  onZipChange = ( e ) => {
    this.setState({
      ...this.state,
        enteredZipcode: e.target.value
    });
  }
}

export default Community;