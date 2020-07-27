import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home.js';
import Community from './containers/Community.js';
import Organizations from './containers/Organizations.js';
import NavBar from './components/NavBar.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current_page: 'home'
    };
  }
//maybe we should consider react router?
  render() {
    switch(this.state.current_page) {
      case 'home': {
        return (
          <div className="App">
            <NavBar />
            <Home />
          </div>
        )
      }
      case 'community': {
        return (
          <div className="App">
            <NavBar />
            <Community />
          </div>
        )
      }
      case 'organizations': {
        return (
          <div className="App">
            <NavBar />
            <Organizations />
          </div>
        )
      }
      default: {
        return (
          <div className="App">
            <NavBar />
            <Home />
          </div>
        )
      } 
    }
  }
}

export default App;
