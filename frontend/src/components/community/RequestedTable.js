import React, { Component } from 'react';
import { Card, CardColumns } from 'react-bootstrap'

class RequestedTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      requestedItems: []
    }
  }

  getRequests() {
    // will grab request data from backend and parse into usable objects
    let temp = [
        {
            foodType: 'Produce',
            foodRequest: 'Carrots and tomatoes',
            additionalNotes: 'Need bite sized items for my child',
            allergies: 'Gluten allergy',
            zipcode: '27517'
        },
        {
            foodType: 'Produce',
            foodRequest: 'Carrots and tomatoes',
            additionalNotes: 'Need bite sized items for my child',
            allergies: 'Gluten allergy',
            zipcode: '27517'
        },
        {
            foodType: 'Produce',
            foodRequest: 'Carrots and tomatoes',
            additionalNotes: 'Need bite sized items for my child',
            allergies: 'Gluten allergy',
            zipcode: '27517'
        }
    ];
    this.setState({requestedItems: temp});
  }

  componentDidMount() {
    this.getRequests();
  }

  render() {
    return (
      <CardColumns className="px-4 mt-5">
          {this.state.requestedItems.map(item => (
            <Card className="text-center p-4 mb-4">
              <Card.Title className="my-2">{item.foodType}</Card.Title>
              <Card.Subtitle>{item.foodRequest}</Card.Subtitle>
              <Card.Text>{item.additionalNotes}</Card.Text>
              <Card.Text>{item.allergies}</Card.Text>
              <Card.Footer>{item.zipcode}</Card.Footer>
            </Card>
          ))}
      </CardColumns>
    );
  }

}

export default RequestedTable;