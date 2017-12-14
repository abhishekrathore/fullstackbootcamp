import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Interest extends Component {
  constructor(props){
    super()
    console.log(props.sports);
    
  }
  
  render() {

    
  let listItems =   this.props.sports.map(sport =>{
                 return <li className='list-group-item' key={sport}>{sport}</li>;
               })

   console.log(listItems)

    return (
      <div>
        <h1>Interests : </h1>
        <ul className='list-group'>
          {listItems}
        </ul>
        
      </div>
    );
  }
}

export default Interest;