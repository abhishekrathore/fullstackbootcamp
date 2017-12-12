import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return (
      <div>
         <img src={this.props.image} alt=""/>
         <h1>{this.props.name}</h1>
      </div>
    );
  }
}

export default Profile;