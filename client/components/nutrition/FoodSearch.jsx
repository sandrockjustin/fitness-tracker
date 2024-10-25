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

  const handleChange = (e)=> {
    setSearch(e.target.value)
  }
  const handleClick = ()=>{

    console.log(searchField)

    //
    

    axios.get(`https://api.spoonacular.com/food/ingredients/search?query=${searchField}&number=1&sortDirection=desc&apiKey=${FOOD_API_KEY}`)
    .then(results=>{

      let id = results.data.results[0].id
      console.log("FOODID", id, results.data.results[0])
      axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${FOOD_API_KEY}&amount=1`)
      .then(data=>{

        console.log("calories", data.data.nutrition.nutrients[2].amount)

        let calories = data.data.nutrition.nutrients[2].amount
        console.log("grams per serving", data.data.nutrition.weightPerServing.amount)

        let grams = data.data.nutrition.weightPerServing.amount
        console.log("calories/gram", calories/grams)

      })
    })
    .catch(err=>{
      console.error("didnt get food", err)
    })
  }

  return(
    <div>food search component

      <input type="text" id='food-search' onChange={handleChange}/>
      {console.log(searchField)}
      <button type="submit" onClick={handleClick}>search</button>

    </div>
  )
}