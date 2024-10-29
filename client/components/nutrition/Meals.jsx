
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
  //MAKES A RANDOM MEAL
/////////////////////////////////////////////////////////////////////


  console.log("PROPS nutrition", props.user.nutrition)

  let exRoutine = props.user.workouts

  let calsBurned = exRoutine.length * 150

  let meal = [];
  let foods = props.user.nutrition
  let foodNum = props.user.nutrition.length;
  let mealSize = 3;
  let mealReplaceAmts = []
  
if(foods.length > 2){

  //makes a random meal
  for (let i = 0; i < mealSize; i++){
    meal[i] = foods[Math.floor(Math.random() * foodNum)]
    meal[i] = foods[Math.floor(Math.random() * foodNum)]
    meal[i] = foods[Math.floor(Math.random() * foodNum)]
  }

  let mealReplenish = calsBurned / mealSize

  for (let i = 0; i < meal.length; i++){
    mealReplaceAmts.push(Math.round((mealReplenish / meal[i].nutDensity)*100)/100)
  }

  console.log("MEAL", meal, mealReplaceAmts)
}
/////////////////////////////////////////////////////////////////////
  return(
    <div style={{fontFamily: "Arial, sans-serif"}}>
      <h1 style={{textAlign: "center"}}>POST-WORKOUT MEALS</h1>
      <div>
      <WorkoutBox sx={{padding: "5px"}}>
          <strong>EXERCISES</strong>
          {exRoutine.map(exercise=>{
            return (
            <div key={`${exercise.name}`}>
              {exercise.name}
            </div>
              )
          })}
          <br></br>
          <strong >CALORIES BURNED:</strong> {calsBurned}
      </WorkoutBox>
        <br></br>
      <MealBox sx={{padding: "5px"}}>
          <div>

            <strong>RANDOM MEAL</strong>
            <br></br>
            {meal.map((food, i)=>{
              return(
                <div>
                  <strong>{mealReplaceAmts[i]} grams of {food.foodName}</strong>
                  <br></br>
                </div>
              )
            })}

            {/* {props.nutrition.map((food, i)=>{
              return(
                <div key={`${food.foodName}-${i}`}>
                  <strong>PANTRY ITEM:</strong> {food.foodName}
                  <br></br>
                  <strong>CALORIC DENSITY/G:</strong> {food.nutDensity}
                  <br></br>
                  <strong>GRAMS TO REFUEL:</strong>{Math.round((calorieCount / food.nutDensity)*100)/100}
                  <br></br>
                  <br></br>
                </div>
              )
            })} */}
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