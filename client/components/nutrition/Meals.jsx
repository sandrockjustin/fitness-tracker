
import React from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';
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
height: 125px;
width: 500px;
margin:auto;
box-sizing: border-box;
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);

`
const Refresh = styled(RefreshIcon)`
transform: scale(.9);
  color: rgba(0, 0, 0, 0.7)
  "&:hover": { color: 'rgba(0, 0, 0, 0.4)'};

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

  let foods = props.user.nutrition
  let foodNum = props.user.nutrition.length;
  let mealSize = 3;
  let meal = [];
  let mealReplaceAmts = []

  const [randMeal, setRandMeal] = useState(meal)
  const [mealRepAm, setMealRepAm] = useState(mealReplaceAmts)

/////////////////////////////////////////////////
//makes a random meal
const randomMeal = () =>{

  //reset meal replace amounts to empty array
  if (mealReplaceAmts.length === mealSize){
   mealReplaceAmts = []
  }
  //as long as there are enough foods to make a meal
  if(foods.length >= mealSize){

    //sets a random food in each meal index
    for (let i = 0; i < mealSize; i++){
      meal[i] = (foods[Math.floor(Math.random() * foodNum)])
      //add corresponding replacement amounts to mealReplaceAmts array
      let mealReplenish = calsBurned / mealSize
      mealReplaceAmts[i] = (Math.round((mealReplenish / meal[i].nutDensity)*100)/100)
   }

   //determines the calories each food must replenish


   //loop through the random meals,
  // for (let i = 0; i < meal.length; i++){
  // }
  //  setRandMeal(meal)
  //  setMealRepAm(mealReplaceAmts)
  console.log("MEAL", meal, mealReplaceAmts)
  }
}

randomMeal()
////////////////////////////////////////////////////
const handleRefresh = () =>{
  console.log("REFRESH!")
  randomMeal()
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

          <div>

            <Refresh sx={{transform: 'scale(.75)', color: 'rgba(0, 0, 0, 0.7)', "&:hover": { color: 'rgba(0, 0, 0, 0.4)'}}} onClick={handleRefresh}></Refresh><strong>RANDOM MEAL</strong>

          </div>


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
