import React, { Component } from 'react';
import { Card, CardColumns, Dropdown, Button } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser';
import '../../css/org-table.css';

class OrgTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orgs: [],
      selectedState: 'NC',
    }
  }
  async getOrgs(state) {
    let url = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=906ba8ca&app_key=1527cbf5cf17fdad91e0cdf4a31ff787&causeID=18&state=' + state;
    let temp = [];
    await fetch(url)
      .then(response => response.json())
      .then(response => {
        for (let i = 0; i < response.length; i++) {
            temp.push(response[i]);
        }
        this.setState({orgs: temp, selectedState: state})
    });
  }
  componentDidMount() {
    this.getOrgs(this.state.selectedState);
  }
  render() {
    return (
      <div>
      <Dropdown className="ml-5">
        <Dropdown.Toggle id="dropdown-basic">{this.state.selectedState}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => this.getOrgs('AL')}>AL</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('AS')}>AS</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('AZ')}>AZ</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('AR')}>AR</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('CA')}>CA</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('CO')}>CO</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('CT')}>CT</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('DE')}>DE</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('FL')}>FL</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('GA')}>GA</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('HI')}>HI</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('ID')}>ID</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('IL')}>IL</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('IN')}>IN</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('IA')}>IA</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('KS')}>KS</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('KY')}>KY</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('LA')}>LA</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('ME')}>ME</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('MD')}>MD</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('MA')}>MA</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('MI')}>MI</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('MN')}>MN</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('MS')}>MS</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('MO')}>MO</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('MT')}>MT</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('NE')}>NE</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('NV')}>NV</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('NH')}>NH</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('NJ')}>NJ</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('NM')}>NM</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('NY')}>NY</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('NC')}>NC</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('ND')}>ND</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('OH')}>OH</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('OK')}>OK</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('OR')}>OR</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('PA')}>PA</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('RI')}>RI</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('SC')}>SC</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('SD')}>SD</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('TN')}>TN</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('TX')}>TX</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('UT')}>UT</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('VT')}>VT</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('VA')}>VA</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('WA')}>WA</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('WV')}>WV</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('WI')}>WI</Dropdown.Item>
          <Dropdown.Item onClick={() => this.getOrgs('WY')}>WY</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <CardColumns className="px-4 mt-5">
          {this.state.orgs.map(org => (
            <Card className="text-center p-4 mb-4 orgCell">
              <Card.Title className="title my-2"><a href={org.websiteURL} target="_blank">{org.charityName}</a></Card.Title>
              <Card.Text>{ReactHtmlParser(org.mission)}</Card.Text>
              <Card.Footer>{org.mailingAddress.city}, {org.mailingAddress.stateOrProvince}</Card.Footer>
              <Card.Footer>
                <Button onClick={() => this.props.addFavoriteHandler(org.charityName, org.websiteURL, org.mailingAddress.city, org.mailingAddress.stateOrProvince)}>Add to Favorites</Button>
              </Card.Footer>
            </Card>
          ))}
      </CardColumns>
      </div>
    );
  }

}

export default OrgTable;