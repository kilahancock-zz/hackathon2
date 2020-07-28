import React, { Component } from 'react';
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
      <div class="container orgGrid">
          {this.state.orgs.map(org => (
            <div class="row orgCell">
              <h2 class="title"><a href={org.websiteURL} target="_blank">{org.charityName}</a></h2><br></br>
              <h6><b>{org.mailingAddress.city}, {org.mailingAddress.stateOrProvince}</b></h6>
              <p>{org.mission}</p>
            </div>
          ))}
      </div>
    );
  }

}

export default OrgTable;