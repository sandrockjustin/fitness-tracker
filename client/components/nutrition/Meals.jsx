
import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';


//////////////////////////////////////////////////
const  dummyExercises = [
  {
    "name": "Incline Hammer Curls",
    "caloriesBurned": 15
  },
  {
    "name": "Biceps curl to shoulder press",
    "caloriesBurned": 10
  },
  {
    "name": "Incline Hammer Curls",
    "caloriesBurned": 20
  },
  {
    "name": "Barbell Curl",
    "caloriesBurned": 25
  },
  {
    "name": "Concentration curl",
    "caloriesBurned": 10
  },
  {
    "name": "Flexor Incline Dumbbell Curls",
    "caloriesBurned": 5
  },
]

//counts calories burned in an workout routine
let calorieCount = dummyExercises.reduce((acc, curr)=>{
  // console.log("ACC", acc, "CURR", curr.caloriesBurned)
  acc+=curr.caloriesBurned
  return acc
}, 0)

// console.log("TOTAL CALORIES BURNED:", calorieCount)


//////////////////////////////////////////////////
export default function Meals(props){

  console.log("MEALS PROPS", props.nutrition)

  props.nutrition.forEach(food=>{
    console.log("FOOD: ", food.foodName)
    console.log("CALORIC DENSITY: ", food.nutDensity)
    console.log("GRAMS TO REFUEL", calorieCount / food.nutDensity)

  })



  return(
    <div style={{fontFamily: "Arial, sans-serif"}}>
      <h1>REFUEL</h1>



    </div>


  )
}
//access saved workout list titles

//access pantry list

//pass a calories burned prop

//create combination of foods to match the calories burned