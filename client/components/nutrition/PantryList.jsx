//import the search component

//list the foods added from search

//add or delete items in the pantry list

import React from 'react'
import {useState} from 'react';
import PantryListItem from './PantryListItem.jsx'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


const PantryBox = styled(Box)`
background: rgba(0, 0, 0, 0.2);
height: 200px;
width: 500px;
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
margin:auto;
overflow-y:auto;
scroll-behavior: smooth;
`

export default function PantryList(props){




  return(
    <div style={{fontFamily: "Arial, sans-serif"}}>
      <br></br>
      <h1 style={{textAlign: "center"}}>PANTRY</h1>


      <PantryBox >
        <div>


        <List>
     {props.nutrition.map((food)=>{


      return(

        <ListItem key={food.foodId} sx={{maxHeight:'30px'}}>

      <PantryListItem  
      checkedFoods={props.checkedFoods} 
      setCheckedFoods={props.setCheckedFoods} 
      fetchUser={props.fetchUser} 
      user={props.user} 
      food={food} />

      </ListItem>
    )
  })}
  </List>
        </div>
  
      </PantryBox>


    </div>
  )
}