import React from 'react';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'

//props.isNotSignedIn
const Navy = (props) => {
  return (
    <Navbar sticky="top" variant="dark" bg="dark" className="w-100">
      <Navbar.Brand><Nav.Link as={Link} to="/" className="navbar-brand">NutriShare</Nav.Link></Navbar.Brand>
      <div style={{ position: 'relative', marginLeft: "auto", display: "inline-flex" }}>
        <Nav.Item>
          <Nav.Link as={Link} to="/community" value="community" className="navbar-brand">My Community</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/organizations" value="organizations" className="navbar-brand">Local Organizations</Nav.Link>
        </Nav.Item>
        <Nav.Link
          className="navbar-brand"
          onClick={props.signUpClickHandler}
          style={{ display: (props.isNotSignedIn ? 'block' : 'none') }}>
          Sign Up
        </Nav.Link>
        <Nav.Link
          className="navbar-brand"
          onClick={props.logoutClickHandler}
          style={{ display: (props.isNotSignedIn ? 'none' : 'block') }}>
          Logout
        </Nav.Link>
      </div>
    </Navbar>
  )
}

export default Navy;