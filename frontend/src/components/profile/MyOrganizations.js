import React, { Component } from 'react';
import { Card, CardColumns } from 'react-bootstrap'

class MyOrganizations extends Component {

  constructor(props) {
    super(props);

    this.state = {
      organizations: []
    }
  }

  getOrganizations() {
    // will grab request data from backend and parse into usable objects
    let temp = [
        {
            name: 'Meals on Wheels',
            url: 'https://www.mealsonwheelsamerica.org/',
            city: 'Charlotte',
            usState: 'NC'
        },
        {
            name: 'Meals on Wheels',
            url: 'https://www.mealsonwheelsamerica.org/',
            city: 'Charlotte',
            usState: 'NC'
        },
        {
            name: 'Meals on Wheels',
            url: 'https://www.mealsonwheelsamerica.org/',
            city: 'Charlotte',
            usState: 'NC'
        },
    ];
    this.setState({organizations: temp});
  }

  componentDidMount() {
    this.getOrganizations();
  }

  render() {
    return (
      <CardColumns className="px-4 mt-5">
          {this.state.organizations.map(org => (
            <Card className="text-center p-4 mb-4">
              <Card.Title className="my-2"><a href={org.url}>{org.name}</a></Card.Title>
              <Card.Footer>{org.city}, {org.usState}</Card.Footer>
            </Card>
          ))}
      </CardColumns>
    );
  }

}

export default MyOrganizations;