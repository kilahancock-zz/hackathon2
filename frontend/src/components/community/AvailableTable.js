import React, { Component } from 'react';
import { Card, CardColumns } from 'react-bootstrap'

class AvailableTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      availableItems: []
    }
  }

  getAvailable() {
    // will grab request data from backend and parse into usable objects
    let temp = [
        {
            foodType: 'Meat',
            foodRequest: 'Ground beef',
            additionalNotes: 'I have a 1-lb package and a 5-lb package',
            zipcode: '27517'
        },
        {
            foodType: 'Meat',
            foodRequest: 'Ground beef',
            additionalNotes: 'I have a 1-lb package and a 5-lb package',
            zipcode: '27517'
        },
        {
            foodType: 'Meat',
            foodRequest: 'Ground beef',
            additionalNotes: 'I have a 1-lb package and a 5-lb package',
            zipcode: '27517'
        }
    ];
    this.setState({availableItems: temp});
  }

  componentDidMount() {
    this.getAvailable();
  }

  render() {
    return (
      <CardColumns className="px-4 mt-5">
          {this.state.availableItems.map(item => (
            <Card className="text-center p-4 mb-4">
              <Card.Title className="my-2">{item.foodType}</Card.Title>
              <Card.Subtitle>{item.foodRequest}</Card.Subtitle>
              <Card.Text>{item.additionalNotes}</Card.Text>
              <Card.Footer>{item.zipcode}</Card.Footer>
            </Card>
          ))}
      </CardColumns>
    );
  }

}

export default AvailableTable;