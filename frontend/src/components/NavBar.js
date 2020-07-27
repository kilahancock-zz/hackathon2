import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = (props) => {

  return (
    <Navbar sticky="top" variant="dark" bg="dark">
      <Navbar.Brand>NutriShare</Navbar.Brand>
      <div  style={{ marginLeft: "auto", display: "inline-flex" }}>
        <Nav.Link value="home" onClick={props.onPageClickedHandler}>Home</Nav.Link>
        <Nav.Link value="community" onClick={props.onPageClickedHandler}>My Community</Nav.Link>
        <Nav.Link value="organizations" onClick={props.onPageClickedHandler}>Local Organizations</Nav.Link>
        <Nav.Link>Sign Up</Nav.Link>
      </div>
    </Navbar>
  )

}

export default NavBar;