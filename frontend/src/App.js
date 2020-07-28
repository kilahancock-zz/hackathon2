import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home.js';
import Community from './containers/Community.js';
import Organizations from './containers/Organizations.js';
import NavBar from './components/NavBar.js'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current_page: 'home'
    };
  }
  render() {
    return(
      <div className="App">
        <Router>
          <NavBar></NavBar>
        <Switch>
          <Route exact path="/">
            <Home />
            </Route>
        </Switch>
        </Router>
      </div>
    )
  }
 
}

export default App;
