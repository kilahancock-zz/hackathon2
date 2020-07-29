import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'

const UserCard = props => {
    const {userKey ,userValue} = props;
    return (
        <div>
            <Card style={{height: "100%"}}>
              <Card.Body> 
                  <Card.Title>
                      {userKey} 
                  </Card.Title>
                  <Card.Text> 
                      {userValue}
                  </Card.Text>
              </Card.Body>
          </Card>
        </div>
    )
}



export default UserCard
