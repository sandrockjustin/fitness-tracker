import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import FOOD_API_KEY from '../../../config.js';


//search bar input

//add food object to pantry button


// axios.get(`/FoodSearch/foods/${query}`)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((error) => {
// 		console.error(`There was an error.`);
// 	})

export default function FoodSearch(props){
  
  
  const [searchField, setSearch] = useState('')
  const [searchResults, setResults] = useState({})

  const handleChange = (e)=> {
    setSearch(e.target.value)
  }
////////////////////////////////////////////////////
  const handleClick = ()=>{
    // console.log(searchField)
    axios.get(`/FoodSearch/${searchField}`)
    .then((foodInfo)=>{
      
      setResults(foodInfo.data)

    })
    .catch((err)=>{
      console.error(err);
    })

  }

///////////////////////////////////////////////////////
  return(
    <div>food search component

      <input type="text" id='food-search' onChange={handleChange}/>
      {console.log(searchField)}
      <button type="submit" onClick={handleClick}>search</button>

    </div>
  )
}