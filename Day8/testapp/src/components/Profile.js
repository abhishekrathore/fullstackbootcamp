import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import Interest from './Interest'
import {BrowserRouter,Route,Link} from 'react-router-dom';

class Profile extends Component {
  constructor(props){
    super()
    this.state = {
      age : props.age
    }  
    this.newSport =""
  }

  incAge(){
    this.setState({
      age: this.state.age+1
    })
    console.log(this.state.age);
    

   }
  
   addNewSport(event){
     console.log(event.target.value)
     this.newSport = event.target.value
   }

   handleClick(){
    this.props.tell(this.newSport)
   }

  render() {
    return (
      <div>
        
         {this.props.children}
         <img className='img-circle' src={this.props.image} alt=""/>
         <h1 className='well'>{this.props.name} ({this.state.age})</h1>
         <button className='btn btn-danger' onClick={this.incAge.bind(this)}>Increase Age</button>
         <input type="text" onChange={this.addNewSport.bind(this)}/>
         <button className='btn btn-success' onClick={this.handleClick.bind(this)}>CLICK</button>
      </div>
    );
  }
}
Profile.propTypes ={
  age : PropTypes.number
}


export default Profile;