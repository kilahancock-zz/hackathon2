import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <div className="text-center my-5">
        <h1>Connect with your community to exchange excess food.</h1>
        <h5>Request items, or offer up your extras.</h5>
        <Button onClick={this.props.resourceClickHandler}>Get started</Button>
      </div>
    );
  }
}

export default Header;