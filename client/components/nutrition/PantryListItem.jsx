import React from 'react'
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

let CustomButt = styled(CloseIcon)`
  transform: scale(0.4);
  color: white;
  size: small;
  background: red;
  padding: 5px;
  margin: 15px

`

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
    <ListItem>
      <h3>{props.food.foodName}</h3>
    <CustomButt type="button" onClick={handleRemove}>X</CustomButt>
    </ListItem>
  )
}