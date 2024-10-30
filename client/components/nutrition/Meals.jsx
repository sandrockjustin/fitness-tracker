
import React from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

const WorkoutBox = styled(Box)`
background: rgba(0, 0, 0, 0.2);
height: 100px;
width: 500px;
margin:auto;
overflow-y:auto;
box-sizing: border-box;
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
padding: 10px
`
const MealBox = styled(Box)`
background: rgba(0, 0, 0, 0.2);
height: 125px;
width: 500px;
margin:auto;
box-sizing: border-box;
box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
padding: 10px

`
const Refresh = styled(RefreshIcon)`
transform: scale(.9);
  color: rgba(0, 0, 0, 0.7)
  "&:hover": { color: 'rgba(0, 0, 0, 0.4)'};

`

//////////////////////////////////////////////////
export default function Meals(props){
  //MAKES A RANDOM MEAL
/////////////////////////////////////////////////////////////////////
useEffect(()=>{
  randomMeal()
}, []
)

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
   setRandMeal(meal)
   setMealRepAm(mealReplaceAmts)

  console.log("MEAL", meal, mealReplaceAmts)
  }
}

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

      <WorkoutBox >
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
      <MealBox >
        <div>

          <Box sx={{display: 'flex', flexDirection: 'row'}}>

            <strong>GENERATE RANDOM MEAL</strong>
            <Refresh sx={{marginLeft: 'auto', marginRight: '0', transform: 'scale(.75)', color: 'rgba(0, 0, 0, 0.7)', "&:hover": { color: 'rgba(0, 0, 0, 0.4)'}}} onClick={handleRefresh}></Refresh>

          </Box>


            {randMeal.map((food, i)=>{
              return(
                <div>
                  <strong>{mealRepAm[i]} grams of {food.foodName}</strong>
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
