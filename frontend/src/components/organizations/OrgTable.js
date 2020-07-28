import React, { Component } from 'react';
import { Card, CardColumns, Dropdown } from 'react-bootstrap'
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
      <Dropdown className="ml-5">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select State
        </Dropdown.Toggle>
        <Dropdown.Menu className="overflow-auto" style={{ maxHeight: "260px" }}>
          <Dropdown.Item onclick={this.getOrgs()}>AL</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>AS</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>AZ</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>AR</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>CA</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>CO</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>CT</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>DE</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>FL</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>GA</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>HI</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>ID</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>IL</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>IN</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>IA</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>KS</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>KY</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>LA</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>ME</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>MD</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>MA</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>MI</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>MN</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>MS</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>MO</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>MT</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>NE</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>NV</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>NH</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>NJ</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>NM</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>NY</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>NC</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>ND</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>OH</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>OK</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>OR</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>PA</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>RI</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>SC</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>SD</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>TN</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>TX</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>UT</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>VT</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>VA</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>WA</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>WV</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>WI</Dropdown.Item>
          <Dropdown.Item onclick={this.getOrgs()}>WY</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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