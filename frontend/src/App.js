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
      current_page: 'organizations',
      zip_code: '27517'
    };
  }
  //maybe we should consider react router?
  render() {
    switch (this.state.current_page) {
      case 'home': {
        return (
          <div className="App">
            <NavBar
              onPageClickedHandler={this.navbarPageSwitchedHandler}
              onSignUpClickedHandler={this.signUpPageHandler}
            />
            <Home />
          </div>
        )
      }
      case 'community': {
        return (
          <div className="App">
            <NavBar
              onPageClickedHandler={this.navbarPageSwitchedHandler}
              onSignUpClickedHandler={this.signUpPageHandler}
            />
            <Community />
          </div>
        )
      }
      case 'organizations': {
        return (
          <div className="App">
            <NavBar
              onPageClickedHandler={this.navbarPageSwitchedHandler}
              onSignUpClickedHandler={this.signUpPageHandler}
            />
            <Organizations />
          </div>
        )
      }
      default: {
        return (
          <div className="App">
            <NavBar
              onPageClickedHandler={this.navbarPageSwitchedHandler}
              onSignUpClickedHandler={this.signUpPageHandler}
            />
            <Home />
          </div>
        )
      }
    }
  }

  // Used by the navbar when one of the tabs is selected that triggers a page
  navbarPageSwitchedHandler = (event) => {
    this.setState({
      current_page: event.currentTarget.getAttribute('value')
    })
  }

  signUpPageHandler = (event) => {
    //TODO: show modal that asks for signup
  }
}

export default App;
