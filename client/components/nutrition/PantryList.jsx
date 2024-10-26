//import the search component

//list the foods added from search

//add or delete items in the pantry list

import React from 'react'
import PantryListItem from './PantryListItem.jsx'

export default function PantryList(props){
  console.log("PANTRY LIST NUTRITION", props.nutrition)



  return(
    <div>pantry list component
     {props.nutrition.map((food)=>{

      // console.log("FOOD", food)

      return(
        <PantryListItem fetchUser={props.fetchUser} user={props.user} food={food} key={food.foodId}/>
      )
     })}


    </div>
  )
}