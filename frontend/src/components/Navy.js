import React from 'react';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'

const Navy = (props) => {

  return (
    <Navbar sticky="top" variant="dark" bg="dark">
      <Navbar.Brand>NutriShare</Navbar.Brand>
      <div style={{ position:'relative',marginLeft: "auto", display: "inline-flex" }}>
        <Nav.Item>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link as={Link} to="/community" value="community" >My Community</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link as={Link} to="/organizations" value="organizations" >Local Organizations</Nav.Link>
        </Nav.Item>
        <Nav.Link onClick={props.signUpClickHandler}>Sign Up</Nav.Link>
      </div>
    </Navbar>
  )

}

export default Navy;