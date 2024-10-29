//import the search component

//list the foods added from search

//add or delete items in the pantry list

import React from 'react'
import PantryListItem from './PantryListItem.jsx'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


const PantryBox = styled(Box)`
background: #f0f0f0;
height: 200px;
width: 500px;
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
margin:auto;
overflow-y:auto;
scroll-behavior: smooth;
`

export default function PantryList(props){
  // console.log("PANTRY LIST NUTRITION", props.nutrition)



  return(
    <div style={{fontFamily: "Arial, sans-serif"}}>
      <br></br>
      <h1 style={{textAlign: "center"}}>PANTRY</h1>


      <PantryBox>
        <List>
     {props.nutrition.map((food)=>{

      //  console.log("*** props.food.foodId", food.foodId)

      return(

        <ListItem key={food.foodId} sx={{maxHeight:'30px'}}>

      <PantryListItem  fetchUser={props.fetchUser} user={props.user} food={food} />

      </ListItem>
    )
  })}
  </List>
  
      </PantryBox>


    </div>
  )
}