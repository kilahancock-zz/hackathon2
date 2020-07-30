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
      },
      resources: {
        donations: [
          {
            foodType: 'Donation',
            foodRequest: 'Carrots and tomatoes',
            additionalNotes: 'Need bite sized items for my child',
            allergies: 'Gluten allergy',
            zipcode: '27517'
        }
        ],
        requests: [
          {
              foodType: 'Produce',
              foodRequest: 'Carrots and tomatoes',
              additionalNotes: 'Need bite sized items for my child',
              allergies: 'Gluten allergy',
              zipcode: '27517'
          },
          {
              foodType: 'Produce',
              foodRequest: 'Carrots and tomatoes',
              additionalNotes: 'Need bite sized items for my child',
              allergies: 'Gluten allergy',
              zipcode: '27517'
          },
          {
              foodType: 'Produce',
              foodRequest: 'Carrots and tomatoes',
              additionalNotes: 'Need bite sized items for my child',
              allergies: 'Gluten allergy',
              zipcode: '27517'
          }
      ],
      },
      organizations: []
    }
  }
  componentDidMount() {
    /* here we can call ALL the get functions in here
    */
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
              signInClickHandler={this.openSignInModalHandler}
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
                userZipcode={this.state.user_info.zipcode}
                requests={this.state.resources.requests}
                donations={this.state.resources.donations}
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

  sendSignUp = ( url, payload ) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow'
    };

    // woot
    fetch( url, requestOptions )
    .then(response => response.json())
    .then(data => {
      console.log("result = " + data.personCreate)
      this.setState({
        ...this.state,
        user_info: {
          ...this.state.user_info,
          id: data.personCreate,
        }
      })
    })
    .catch(error => console.log('error', error));
  }

  signUpModalSubmitHandler = (username, email, password, zipcode) => {

    // Send Information to Back-end
    let payload = {
      username: username,
      email: email,
      password: password,
      zipcode: zipcode
    };

    this.sendSignUp("http://localhost:3000/signup", payload );

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

    // this.sendPostBackEnd("http://localhost:3000/login", payload );

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

  sendResourcePost = ( url, payload ) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow'
    };

    fetch( url, requestOptions )
    .then(response => response.json())
    .then(data => {
      console.log("result = " + data.resourceId)
      // ? Do we save in state anything?
    })
    .catch(error => console.log('error', error));
  }

  getResourcePost = (url, payload) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: 'follow'
    };

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      let requestArr = [];
      let donationArr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].request) {
          requestArr.push(data[i]);
        } else {
          donationArr.push(data[i]);
        }
      }
      this.setState({
        ...this.state,
        resources: {
          ...this.state.resources,
          requests: requestArr,
          donations: donationArr
        }
      });
    })
    .catch(error => console.log('error', error));
  }

  resourceModalSubmitHandler = (type, category, description, notes) => {

    // Send Information to Back-end
    let payload = {
      pid: this.state.user_info.id,
      rname: description,
      rtype: category,
      request: type === 'Request',
      dsc: notes,
      zipcode: this.state.user_info.zipcode
    };
    console.log(payload);
    this.sendResourcePost("http://localhost:3000/postResource", payload );

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
