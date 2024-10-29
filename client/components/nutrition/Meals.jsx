
import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const WorkoutBox = styled(Box)`
background: #f1f1f1;
height: 100px;
width: 500px;
margin:auto;
overflow-y:auto;
box-sizing: border-box;
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
`
const MealBox = styled(Box)`
background: #f1f1f1;
height: 100px;
width: 500px;
margin:auto;
overflow-y:auto;
box-sizing: border-box;
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);

`



//////////////////////////////////////////////////
const dummyExercises = [
  {
    "name": "Incline Hammer Curls",
    "caloriesBurned": 75
  },
  {
    "name": "Biceps curl to shoulder press",
    "caloriesBurned": 50
  },
  {
    "name": "Incline Hammer Curls",
    "caloriesBurned": 100
  },
  {
    "name": "Barbell Curl",
    "caloriesBurned": 125
  },
  {
    "name": "Concentration curl",
    "caloriesBurned": 50
  },
  {
    "name": "Flexor Incline Dumbbell Curls",
    "caloriesBurned": 75
  },
]

//counts calories burned in an workout routine
let calorieCount = dummyExercises.reduce((acc, curr)=>{
  // console.log("ACC", acc, "CURR", curr.caloriesBurned)
  acc+=curr.caloriesBurned
  return acc
}, 0)

//////////////////////////////////////////////////
export default function Meals(props){
  props.nutrition.forEach(food=>{
  })


  return(
    <div style={{fontFamily: "Arial, sans-serif"}}>
      <h1 style={{textAlign: "center"}}>POST-WORKOUT MEALS</h1>
      <div>
      <WorkoutBox sx={{padding: "5px"}}>
          <strong>EXERCISES</strong>
        {dummyExercises.map(exercise=>{
          return(
              <div>{exercise.name}</div>
          
            )
          })}
          <br></br>
          <strong >CALORIES BURNED:</strong> {calorieCount}
        </WorkoutBox>
        <br></br>
        <MealBox sx={{padding: "5px"}}>
          <div>
            {props.nutrition.map(food=>{
              return(
                <div>
                  <strong>PANTRY ITEM:</strong> {food.foodName}
                  <br></br>
                  <strong>CALORIC DENSITY/G:</strong> {Math.round(food.nutDensity)/100}
                  <br></br>
                  <strong>GRAMS TO REFUEL:</strong>{Math.round((calorieCount / food.nutDensity) * 100)/100}
                  <br></br>
                  <br></br>
                </div>
              )
            })}
          </div>
          </MealBox>
      </div>



    </div>


  )
}

//access saved workout list titles

//access pantry list

//pass a calories burned prop

//create combination of foods to match the calories burned