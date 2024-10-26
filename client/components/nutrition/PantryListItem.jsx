import React from 'react'
import axios from 'axios';

export default function PantryListItem(props){
  // console.log("PANTRYLISTITEM PROPS", props)

  const handleRemove = () =>{
    console.log("CLICK X", props)
    axios.put(`/pantry/food/${props.user._id}`, { foodData: props.food.foodId})
    .then(props.fetchUser())
    .catch((err)=>{
      console.error(err)
    })
  }


  return(
    <div>food item: {props.food.foodName}
    <button type="button" onClick={handleRemove}>X</button>
    </div>
  )
}