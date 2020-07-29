import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import UserCard from "../components/profile/UserCard";

/* 
this will show after authentifcated user logins. should see number of requests made, donations made, name, and a my organization tab? 
*/

export const Profile = () => {
  const userProf = {
    name: "Sam",
    lastName: "Gomez Olvera",
    requestsMade: 30,
    donationsMade: 20,
  };
  const [user, setUser] = useState(userProf);
  return (
    <div>
      <Jumbotron>
        <h1>Hi {user.name}! 
        <br/>
        Welcome to your profile! Here are some of your stats...</h1>
      </Jumbotron>
      <Container fluid>
          <Row className="justify-content-md">
              <Col> 
              <UserCard userKey="Requests Made: " userValue={user.requestsMade}/>
              </Col>
              <Col> 
              <UserCard userKey="Donations Made: " userValue={user.donationsMade}/>
              </Col>   
          </Row>
      </Container>
    </div>
  );
};
