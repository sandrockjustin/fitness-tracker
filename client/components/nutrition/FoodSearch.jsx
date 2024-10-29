import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

//search bar input

//add food object to pantry button

const CustomButt = styled(Button)`
background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
padding: 15px;
margin: 15px;


`;

export default function FoodSearch(props){

  const [searchField, setSearch] = useState('')
  const handleChange = (e)=> {
    setSearch(e.target.value)
  }
////////////////////////////////////////////////////
//on click, we search for the food item
  const handleClick = ()=>{
    //and the search to the /FoodSearch endpoint
    axios.get(`/user/nutrition/search/${searchField}`)
      .then((foodInfo)=>{
        // console.log("FOODINFO", foodInfo.data)
        setResults(foodInfo.data)
        handleAdd(foodInfo.data)
      })
      .catch((err)=>{
        console.error(err);
      })
  }

  const handleAdd = (foodInfo)=>{

    axios.put(`/user/nutrition/create`, { nutrition: foodInfo })
      .then((data) => {
        // console.log("HANDLE ADD DATA", data)
      })
      .catch((err)=>{
        console.error(`Error during PUT request to database.`)
      })
  }

///////////////////////////////////////////////////////
  return(
    <div id="search-foods" style={{textAlign: 'justify'}}>
      <TextField style={{display: 'inline-block'}} variant="outlined" label="Search Foods" type="text" id='food-search' onChange={handleChange}/>
      {/* {console.log(searchField)} */}
      <CustomButt sx={{ "&:hover": { background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)'} }} variant="contained" type="submit" onClick={handleClick}>Add Food</CustomButt>

    </div>
  )
}