import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

//STATELESS COMPONENTS
const Interest = ({sports}) =>  {
  let listItems = sports.map(sport =>{
                 return <li className='list-group-item' key={sport}>{sport}</li>;
               })
    return (
      <div>
        <h1>Interests : </h1>
        <ul className='list-group'>
          {listItems}
        </ul> 
      </div>
    );
  }


export default Interest;