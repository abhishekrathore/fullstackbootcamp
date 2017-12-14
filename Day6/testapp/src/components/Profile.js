import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
class Profile extends Component {
  constructor(props){
    super()
    this.state = {
      age : props.age
    }  
  }

  incAge(){
    this.setState({
      age: this.state.age+1
    })
    console.log(this.state.age);
    

   }
  

  render() {
    return (
      <div>
         {this.props.children}
         <img className='img-circle' src={this.props.image} alt=""/>
         <h1 className='well'>{this.props.name} ({this.state.age})</h1>
         <button className='btn btn-danger' onClick={this.incAge.bind(this)}>Increase Age</button>
      </div>
    );
  }
}
Profile.propTypes ={
  age : PropTypes.number
}


export default Profile;