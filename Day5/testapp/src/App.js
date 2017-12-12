import React, { Component } from 'react';
import Profile from './components/Profile';
import Interest from './components/Interest';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      name:"Ajay",
      image:"http://lorempixel.com/200/200",
      interests: ["cricket","hockey","footbal"]
    }
  }
  
  
  render() {
    return (
      <div>
          <Profile name={this.state.name} image={this.state.image}/>
          <Interest/>
      </div>
    );
  }
}

export default App;
