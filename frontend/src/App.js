import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home.js';
import Community from './containers/Community.js';
import Organizations from './containers/Organizations.js';
import Navy from './components/Navy.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignInModal from './components/SignInModal.js';
import SignUpModal from './components/SignUpModal.js';
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
        zipcode: ''
      },
      modals: {
        isSignInShown: false,
        isSignUpShown: false,
        isResourceShown: false,
      }
    }
  }
  render() {
    console.log("state: ", this.state);
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
            <Navy signUpClickHandler={this.openSignUpModalHandler} />
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
              <Profile/>
            </Route>
            <Route exact path="*">
             <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </div>
    )
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

  signUpModalSubmitHandler = (username, email, password, zipcode) => {
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
    //TODO: make API call to sign up a new user
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
    //Todo: API Call to get info
    console.log("Username and pw submitted: ", username, password);
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
    this.setState({
      ...this.state,
      modals: {
        ...this.state.modals,
        isSignUpShown: false,
        isSignInShown: false,
        isResourceShown: false
      },
    });
    //TODO: make API call to register request/donation
  }

  addFavoriteHandler = (event) => {
    //TODO: make API call to add organization to user's favorites 
  }

  claimItemHandler = (event) => {
    //TODO: make API call to claim item and add to user profile
  }
}

export default App;
