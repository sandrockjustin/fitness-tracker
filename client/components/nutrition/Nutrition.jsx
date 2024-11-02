import React from 'react'
import {useState} from 'react';
import PantryList from './PantryList.jsx'
import FoodSearch from './FoodSearch.jsx'
import Meals from './Meals.jsx'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


let AllBox = styled(Box)`
display: flex; 
flex-direction: column; 
align-items: center;

`

let NutBox = styled(Box)`
background: linear-gradient(45deg, #556270 30%, #FF6B6B 90%);
width: 525px;
border-radius: 5px;
padding: 10px;
box-sizing: border-box

`

export default function Nutrition(props){
  const [checkedFoods, setCheckedFoods] = useState([])
  
  return(
<AllBox>
  <br></br>
  <div>
  <FoodSearch user={props.user} fetchUser={props.fetchUser}/>
  </div>

  <NutBox >

   <div>

    <PantryList 
    checkedFoods={checkedFoods} 
    setCheckedFoods={setCheckedFoods} 
    theme={props.theme} 
    fetchUser={props.fetchUser} 
    user={props.user} 
    nutrition={props.user.nutrition}/>

    <br></br>

    <Meals 
    checkedFoods={checkedFoods} 
    theme={props.theme} 
    fetchUser={props.fetchUser} 
    user={props.user} 
    routines={props.routines}
    nutrition={props.user.nutrition}/>
   

    <br></br>

   </div>
  </NutBox>


  <br></br>
  <img src="https://media.tenor.com/ZFUJ2eZcm2IAAAAM/work-out-excercise.gif"/>
</AllBox>
  )
}