import React, { Component } from 'react';
import { Card, CardColumns } from 'react-bootstrap'
import '../../css/org-table.css';

class OrgTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orgs: []
    }
  }
  async getOrgs() {
    let url = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=eaa14780&app_key=298af6f97beb362fc42b7c54c31ed179&causeID=18&state=NC';
    let temp = [];
    await fetch(url)
      .then(response => response.json())
      .then(response => {
        for (let i = 0; i < response.length; i++) {
            temp.push(response[i]);
            console.log(temp[i])
        }
        this.setState({orgs: temp})
    });
  }
  componentDidMount() {
    this.getOrgs();
  }
  render() {
    return (
      <div>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button class="dropdown-item" type="button">Action</button>
          <button class="dropdown-item" type="button">Another action</button>
          <button class="dropdown-item" type="button">Something else here</button>
        </div>
      </div>
      <CardColumns className="px-4 mt-5">
          {this.state.orgs.map(org => (
            <Card className="text-center p-4 mb-4 orgCell">
              <Card.Title class="title my-2"><a href={org.websiteURL} target="_blank">{org.charityName}</a></Card.Title>
              <Card.Text>{org.mission}</Card.Text>
              <Card.Footer>{org.mailingAddress.city}, {org.mailingAddress.stateOrProvince}</Card.Footer>
            </Card>
          ))}
      </CardColumns>
      </div>
    );
  }

}

export default OrgTable;