import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home.js';
import Community from './containers/Community.js';
import Organizations from './containers/Organizations.js';
import Navy from './components/Navy.js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SignInModal from './components/SignInModal.js';
import SignUpModal from './components/SignUpModal.js';
import NotFound from './components/NotFound'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_info: {
        email: '',
        username: '',
        password: '',
        zipcode: ''
      },
      modals: {
        isSignInShown: false,
        isSignUpShown: false,
      }
    }
  }
  render() {
    console.log("state: ", this.state);
    return (
      <div className="App">
        <SignUpModal isShown={this.state.modals.isSignUpShown} closeModal={this.closeSignUpModal} submitModal={this.signUpModalSubmitHandler} />
        <Router>
          <div className="nav">
            <Navy signUpClickHandler={this.signUpPageClickedHandler}/>
          </div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/community">
              <Community />
            </Route>
            <Route path="/organizations">
              <Organizations />
            </Route>
          </Switch>
          <Route path="*">
             <NotFound></NotFound>
            </Route>
        </Router>
      </div>
    )
  }

  signUpPageClickedHandler = (event) => {
    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isSignUpShown: true,
      }
    });
  }

  closeSignUpModal = (event) => {
    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isSignUpShown: false,
      }
    });
  }

  signUpModalSubmitHandler = (username, email, password, zipcode) => {
    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isSignUpShown: false,

        user_info: {
          email: email,
          username: username,
          password: password,
          zipcode: zipcode
        },
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
