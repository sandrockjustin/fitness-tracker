import React from 'react';
import {useState} from 'react';
import axios from 'axios';

//search bar input

//add food object to pantry button

export default function FoodSearch(props){

  const [searchField, setSearch] = useState('')
  const [searchResults, setResults] = useState({})
  const handleChange = (e)=> {
    setSearch(e.target.value)
  }
////////////////////////////////////////////////////
//on click, we search for the food item
  const handleClick = ()=>{
    //and the search to the /FoodSearch endpoint
    axios.get(`/FoodSearch/${searchField}`)
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

    axios.put(`/pantry/${props.user._id}`, { nutrition: foodInfo })
      .then((data) => {
        // console.log("HANDLE ADD DATA", data)
      })
      .catch((err)=>{
        console.error(`Error during PUT request to database.`)
      })
  }

///////////////////////////////////////////////////////
  return(
    <div>food search component

      <input type="text" id='food-search' onChange={handleChange}/>
      {/* {console.log(searchField)} */}
      <button type="submit" onClick={handleClick}>search</button>

    </div>
  )
}