import React, { Component } from 'react';
import Profile from './components/Profile';
import Interest from './components/Interest';
import $ from 'jquery'

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

  getData(ref){
    let root = 'http://localhost:8080/hello';
    
    $.ajax({
      url: root,
      method: 'GET'
    }).then(function(data) {
      ref.setState({
        sports:data.map(post=>post.name)
      })
    });
  }
  

  addSport(newSport){
    let sportsList = this.state.sports
    sportsList.push(newSport)
    this.setState({
      sports:sportsList
    })
  }
  
  render() {
    this.getData(this);
    
    return (
      <div>
          <Profile name={this.state.name} 
          image={this.state.image} 
          age={this.state.age}
          tell={this.addSport.bind(this)}>
            <h1>Hello</h1>
            <h2>world</h2>
          </Profile>
          <Interest sports={this.state.sports}/>
      </div>
    );
  }
}

export default App;
