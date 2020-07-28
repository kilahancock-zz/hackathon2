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
 
}

export default App;
