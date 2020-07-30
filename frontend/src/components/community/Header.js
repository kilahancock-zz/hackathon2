import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import classes from '../../css/org-header.module.css';

class Header extends Component {
  render() {
    return (
      <div className="text-center my-5">
        <h1>Connect with your community to exchange excess food.</h1>
        <br />
        <div className={classes.colContainer}>
          <Col>
            <p>Search your community</p>
            <div className={classes.searchCol}>
              <Form.Label className="mx-sm-3">Zipcode</Form.Label>
              <Form.Control className="mx-sm-6" defaultValue={this.props.userZipcode} onChange={this.props.updateZip}/>
              <Button className="mx-sm-3">Search</Button>
            </div>
          </Col>
          <div className={classes.vertDivide} />
          <Col>
            <p>Request items, or offer up your extras.</p>
            <Button onClick={this.props.resourceClickHandler}>Get started</Button>
          </Col>
        </div>

      </div>
    );
  }
}

export default Header;