import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

let CustomCheck = styled(Checkbox)`
`
let CustomButt = styled(DeleteIcon)`

  display: flex;
  justify-content: space-between;
  transform: scale(.825);
  padding: 5px;
  color: rgba(0, 0, 0, 0.7)
  "&:hover": { color: 'rgba(0, 0, 0, 0.4)'};
`

export default function PantryListItem(props){


  const [checked, setChecked] = useState(false);
  

  //when a box is checked
  const handleChange = (e) => {

    //set the state to 
    setChecked(e.target.checked);
    console.log("TARGET", e.target.checked)
    if (checked === false){
      props.setCheckedFoods(props.checkedFoods.concat([props.food]))

    } else {

      props.setCheckedFoods(props.checkedFoods.filter(food=>{
        console.log(props.food)
        return food.foodName !== props.food.foodName
      
      }))
    }
  };


  // console.log("PANTRYLISTITEM PROPS", props)
  const handleRemove = () =>{
    console.log("CLICK X", props)
    axios.put(`/user/nutrition/delete`, { foodData: props.food.foodId})
    .then(props.fetchUser())
    .catch((err)=>{
      console.error(err)
    })
  }

  return(
    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <CustomCheck
      color="default"
      checked={checked}
      onChange={(e)=>{handleChange(e)}}
      />

      <Typography variant="p">{props.food.foodName}</Typography>
    <CustomButt sx={{ "&:hover": { color: 'rgba(0, 0, 0, 0.4)'} }} type="button" onClick={handleRemove}>

      
    </CustomButt>
    </Box>
  )
}