import React, { useState } from "react";
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import UserCard from '../components/profile/UserCard.js';
import ProfileTabs from '../components/profile/ProfileTabs.js';

/* 
this will show after authentifcated user logins. should see number of requests made, donations made, name, and a my organization tab? 
*/

export const Profile = (props) => {
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
          <Row className="justify-content-md">
            <ProfileTabs claimItemHandler={props.claimItemHandler} />
          </Row>
      </Container>
    </div>
  );
};
