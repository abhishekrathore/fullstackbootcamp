import React, { Component } from 'react';
import Profile from './components/Profile';
import Interest from './components/Interest';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      name:"Ajay",
      age:23,
      image:"http://lorempixel.com/200/200",
      sports: ["cricket","hockey","footbal"]
    }
  }
  
  
  render() {
    return (
      <div>
          <Profile name={this.state.name} image={this.state.image} age={this.state.age}>
            <h1>Hello</h1>
            <h2>world</h2>
          </Profile>
          <Interest sports={this.state.sports}/>
      </div>
    );
  }
}

export default App;
