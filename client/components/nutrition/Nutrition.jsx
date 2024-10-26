import React from 'react'
import PantryList from './PantryList.jsx'
import FoodSearch from './FoodSearch.jsx'
import Meals from './Meals.jsx'


export default function Nutrition(props){

  return(
<>
  <br></br>
    <FoodSearch user={props.user}/>
  <br></br>
    <PantryList/>
  <br></br>  
    <Meals/>
</>
  )
}