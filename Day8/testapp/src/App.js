import React, { Component } from 'react';
import Profile from './components/Profile';
import Interest from './components/Interest';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import $ from 'jquery'

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      name:"Ajay",
      age:23,
      image:"http://lorempixel.com/200/200",
      sports: JSON.parse(localStorage.getItem('sports')) || []
    }
    
  }

  getData(ref){
    let root = 'http://jsonplaceholder.typicode.com';
    
    $.ajax({
      url: root + '/posts',
      method: 'GET'
    }).then(function(data) {
      ref.setState({
        sports:data.map(post=>post.title)
      })
    });
  }
  

  addSport(newSport){
    let sportsList = this.state.sports
    sportsList.push(newSport)
    localStorage.setItem('sports',JSON.stringify(sportsList))
    this.setState({
      sports:sportsList
    })
  }
  
  render() {
    // this.getData(this);
    
    return (
      <div>

        <h1>My App </h1>
       

        <BrowserRouter>
        <div>
             <Link to="/interest/1">Interest</Link>
             <Link to="/profile">Profile</Link>
            <Route path="/interest/:name" render={(props)=><Interest {...props} sports={this.state.sports}/>}/>
            <Route path="/profile" render={()=><Profile name={this.state.name} 
           image={this.state.image} 
          age={this.state.age}
          tell={this.addSport.bind(this)}/>}/>
        </div>
        </BrowserRouter>




          {/* <Profile name={this.state.name} 
           image={this.state.image} 
          age={this.state.age}
          tell={this.addSport.bind(this)}>
            <h1>Hello</h1>
            <h2>world</h2>
          </Profile>
          <Interest sports={this.state.sports}/> */}
      </div>
    );
  }
}

export default App;
