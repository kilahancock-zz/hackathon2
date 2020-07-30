import React, { Component } from "react";

class Home extends Component {
  render() {
    /*
    /charity
    sendGetBackend with pid
      Returns favorited charities by that user
    sendPostBackend with pid, Cname, CURL, Ccity, Cstate
        Return? 
    /resources

    */
    return (
      <div id="home">
        <div className="home-container"> 
          <div className="home-img">
            </div>
           <div className="title">
             <h1>NutriShare</h1>
             <br/>
             <h3 className="subtitle">Every day, food is thrown out and goes to waste while people go without. We aim to connect community members in a food sharing program to continue the fight against hunger and lower food waste. </h3>
           </div>
        </div>
      </div>
    );
  }
}

export default Home;
