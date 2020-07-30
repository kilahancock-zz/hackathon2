import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home.js';
import Community from './containers/Community.js';
import Organizations from './containers/Organizations.js';
import Navy from './components/Navy.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignInModal from './components/modals//SignInModal.js';
import SignUpModal from './components/modals/SignUpModal.js';
import NotFound from './components/NotFound'
import { Profile } from './containers/Profile';
import ResourceModal from './components/community/ResourceModal.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_info: {
        email: '',
        username: '',
        password: '',
        zipcode: '',
        // figure this out after sign-up/sign-in
        id: 0
      },
      modals: {
        isSignInShown: false,
        isSignUpShown: false,
        isResourceShown: false,
      }
    }
  }
  render() {
    return (
      <div className="App">
        <SignUpModal
          isShown={this.state.modals.isSignUpShown}
          closeModal={this.closeSignUpModal}
          submitModal={this.signUpModalSubmitHandler}
          openSignInHandler={this.openSignInModalHandler}
        />
        <SignInModal
          isShown={this.state.modals.isSignInShown}
          closeModal={this.closeSignInModal}
          submitModal={this.signInModalSubmitHandler}
          openSignUpHandler={this.openSignUpModalHandler}
        />
        <ResourceModal
          isShown={this.state.modals.isResourceShown}
          closeModal={this.closeResourceModal}
          submitModal={this.resourceModalSubmitHandler}
          openResourceHandler={this.openResourceModalHandler}
        />
        <Router>
          <div className="nav">
            <Navy
              signUpClickHandler={this.openSignUpModalHandler}
              logoutClickHandler={this.logoutClickedHandler}
              isNotSignedIn={!this.state.user_info.username}
            />
          </div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/community">
              <Community
                resourceClickHandler={this.openResourceModalHandler}
                claimItemHandler={this.claimItemHandler}
              />
            </Route>
            <Route path="/organizations">
              <Organizations addFavoriteHandler={this.addFavoriteHandler} />
            </Route>
            <Route path="/profile">
              <Profile claimItemHandler={this.claimItemHandler} />
            </Route>
            <Route exact path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

  logoutClickedHandler = () => {
    this.setState({
      ...this.state,
      user_info: {
        email: '',
        username: '',
        password: '',
        zipcode: ''
      }
    })
  }

  openSignUpModalHandler = () => {
    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isSignUpShown: true,
        isSignInShown: false
      }
    });
  }

  closeSignUpModal = () => {
    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isSignUpShown: false,
      }
    });
  }

  openSignInModalHandler = () => {
    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isSignUpShown: false,
        isSignInShown: true
      }
    });
  }

  sendPostBackEnd = ( url, payload ) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      mode: "no-cors",
      headers: {
          'Content-Type': 'application/json'
      }
    }

    fetch(url, options)
      .then(response => console.log(response));
  }

  sendGetBackEnd = ( url, payload ) => {
    const options = {
      method: 'GET',
      body: JSON.stringify(payload),
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }

  signUpModalSubmitHandler = (username, email, password, zipcode) => {

    // Send Information to Back-end
    let payload = {
      username: username,
      email: email,
      password: password,
      zipcode: zipcode
    };

    this.sendPostBackEnd("http://localhost:3000/signup", payload );
    
    // Update State
    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isSignUpShown: false,
        isSignInShown: false
      },

      user_info: {
        email: email,
        username: username,
        password: password,
        zipcode: zipcode
      },
    });
  }

  addFavoriteHandler = (orgName, orgURL, orgCity, orgState) => {

    let payload = {
      id: 1,
      pid: 1,
      cname: orgName,
      cUrl: orgURL,
      ccity: orgCity,
      cstate: orgState
    };

    this.sendPostBackEnd("http://localhost:3000/charity", payload );
  }

  closeSignInModal = (event) => {
    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isSignInShown: false,
      }
    });
  }

  signInModalSubmitHandler = (username, password) => {
    console.log("Username and pw submitted: ", username, password);
    // Send Information to Back-end
    let payload = {
      username: username,
      password: password,
    };

    this.sendPostBackEnd("http://localhost:3000/login", payload );

    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isSignUpShown: false,
        isSignInShown: false,
      },

      user_info: {
        ...this.state.user_info,
        username: username,
        password: password,
      },
    });
  }

  openResourceModalHandler = () => {
    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isSignUpShown: false,
        isSignInShown: false,
        isResourceShown: true
      }
    });
  }

  closeResourceModal = (event) => {
    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isResourceShown: false,
      }
    });
  }

  resourceModalSubmitHandler = (type, category, description, notes) => {

    // Send Information to Back-end
    let payload = {
      id: 1,
      // ? we need personID from App.state
      pid: 1,
      // ? we need zipcode from App.state
      zipcode: '27517',
      request: type === 'Request',
      rtype: category,
      rname: description,
      notes: notes
    };
    console.log(payload);
    // ! Make sure this works eventually
    this.sendPostBackEnd("http://localhost:3000/submitResource", payload );

    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isSignUpShown: false,
        isSignInShown: false,
        isResourceShown: false
      },
    });
  }

  claimItemHandler = (event) => {
    //TODO: make API call to claim item and add to user profile
  }
}

export default App;
