import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

//STATELESS COMPONENTS
const Interest = (props) =>  {
  console.log(props)
  let listItems = props.sports.map(sport =>{
                 return <li className='list-group-item' key={sport}>{sport}</li>;
               })
    return (
      <div>
        <h1>Interests ({props.match.params.name}) : </h1>
        <ul className='list-group'>
          {listItems}
        </ul> 
      </div>
    );
  }


export default Interest;