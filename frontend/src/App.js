import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home.js';
import Community from './containers/Community.js';
import Organizations from './containers/Organizations.js';
import Navy from './components/Navy.js'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_info: {
        email: '',
        username: '',
        password: '',
        zipcode: ''
      }
    }
  }
  render() {
    return(
      <div className="App">
        
        <Router>
        <div className="nav">
        <Navy> </Navy>
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/community">
            <Community/>
          </Route>
          <Route path="/organizations">
            <Organizations/>
          </Route>
        </Switch>
        </Router>
      </div>
    )
  }
 
  signUpPageHandler = (event) => {
    //TODO: show modal that asks for signup
  }

  signUpModalSubmitHandler = (username, email, password, zipcode) => {
    this.setState({
      user_info:{
        email: email,
        username: username,
        password: password,
        zipcode: zipcode
      }
    });
    //TODO: make API call to sign up a new user
  }

  signInModalSubmitHandler = (username, password) => {
    //Todo: API Call to get info
    this.setState({
      user_info: {
        username: username,
        password: password
      }
    })
  }
}

export default App;
