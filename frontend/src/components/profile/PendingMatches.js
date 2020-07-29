import React, { Component } from 'react';
import { Card, CardColumns, Button } from 'react-bootstrap'

class PendingMatches extends Component {

  constructor(props) {
    super(props);

    this.state = {
      suggestedItems: []
    }
  }

  getSuggested() {
    // will grab request data from backend and parse into usable objects
    let temp = [
        {
            category: 'Meat',
            description: 'Ground beef',
            notes: 'I have a 1-lb package and a 5-lb package',
        },
        {
            category: 'Meat',
            description: 'Ground beef',
            notes: 'I have a 1-lb package and a 5-lb package',
        },
        {
            category: 'Meat',
            description: 'Ground beef',
            notes: 'I have a 1-lb package and a 5-lb package',
        }
    ];
    this.setState({suggestedItems: temp});
  }

  componentDidMount() {
    this.getSuggested();
  }

  render() {
    return (
      <CardColumns className="px-4 mt-5">
          {this.state.suggestedItems.map(item => (
            <Card className="text-center p-4 mb-4">
              <Card.Title className="my-2">{item.category}</Card.Title>
              <Card.Subtitle>{item.description}</Card.Subtitle>
              <Card.Text>{item.notes}</Card.Text>
              <Card.Footer>
                <Button onClick={this.props.claimItemHandler}>Claim this Item</Button>
              </Card.Footer>
            </Card>
          ))}
      </CardColumns>
    );
  }

}

export default PendingMatches;