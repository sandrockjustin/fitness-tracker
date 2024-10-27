//import the search component

//list the foods added from search

//add or delete items in the pantry list

import React from 'react'
import PantryListItem from './PantryListItem.jsx'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


const PantryBox = styled(Box)`
background: #f0f0f0;
height: 200px;
overflow-y:auto;

`

export default function PantryList(props){
  console.log("PANTRY LIST NUTRITION", props.nutrition)



  return(
    <div style={{fontFamily: "Arial, sans-serif"}}>
      <h1>PANTRY</h1>


      <PantryBox>
     {props.nutrition.map((food)=>{

       // console.log("FOOD", food)

      return(

        <List key={food.foodId} sx={{maxHeight:'10px'}}>

      <PantryListItem fetchUser={props.fetchUser} user={props.user} food={food} />

      </List>
    )
  })}
  
      </PantryBox>


    </div>
  )
}