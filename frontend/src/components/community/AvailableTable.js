import React, { Component } from 'react';
import { Card, CardColumns, Button } from 'react-bootstrap'

class AvailableTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      availableItems: []
    }
  }

  render() {
    return (
      <CardColumns className="px-4 mt-5">
          {this.props.donations.map(item => (
            <Card className="text-center p-4 mb-4">
              <Card.Title className="my-2">{item.foodType}</Card.Title>
              <Card.Subtitle>{item.foodRequest}</Card.Subtitle>
              <Card.Text>{item.additionalNotes}</Card.Text>
              <Card.Footer>{item.zipcode}</Card.Footer>
              <Card.Footer>
                <Button onClick={this.props.claimItemHandler}>Claim this Item</Button>
              </Card.Footer>
            </Card>
          ))}
      </CardColumns>
    );
  }

}

export default AvailableTable;