import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CurrentMealPlans(props) {

  const [ meals, setMeals ] = useState([]);

  function fetchMeals() {
    axios.get('/user/nutrition/meals/all')
      .then((response) => {
        if (response.data){ setMeals(response.data) }
      })
      .catch((error) => {
        console.error(`Error on request for current meal plans.`)
      })
  }


  function deleteMeal(targetMeal) {
    axios.delete(`/user/nutrition/meals/delete/${targetMeal}`)
      .then(() => {
        fetchMeals();
      })
      .catch((error) => {
        console.error(`Error on delete for meal ${targetMeal}.`)
      })
  }

  useEffect(() => {
    fetchMeals();
  }, [])

  return (
    <div>
      { meals.length > 0 ?
        <div id="mealsContainer">
          {
            meals.map((meal) => {
              return (
                <div style={{paddingTop:"35px" }} key={meal._id}>
                  <TableContainer component={Paper} key={meal._id * 2}>
                    <Table sx={{ minWidth: 650}} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          { meal.routine_name.length > 0 ?
                            <TableCell sx={{display: 'flex', alignItems: 'center'}}>
                              "{meal.routine_name}" - Meal Items      
                              <DeleteIcon onClick={() => deleteMeal(meal._id)} sx={{transform: 'scale(.75)', "&:hover": { color: 'rgba(0, 0, 0, 0.4)'}}}/>
                            </TableCell>
                            :
                            <TableCell sx={{display: 'flex', alignItems: 'center'}}>
                              Unassigned - Meal Items      
                              <DeleteIcon onClick={() => deleteMeal(meal._id)} sx={{transform: 'scale(.75)', "&:hover": { color: 'rgba(0, 0, 0, 0.4)'}}}/>
                            </TableCell>
                          }
                          <TableCell align="right">Category</TableCell>
                          <TableCell align="right">Calories&nbsp;</TableCell>
                          <TableCell align="right">Serving Size&nbsp;(g)</TableCell>
                          <TableCell align="right">Nutritional Density&nbsp;</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {meal.food_items.map((foodItem) => (
                          <TableRow
                            key={`${meal._id}-${foodItem.foodId}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {foodItem.foodName}
                            </TableCell>
                            {foodItem.category ?
                              <TableCell align="right">{foodItem.category}</TableCell>
                              :
                              <TableCell align="right">not specified</TableCell>
                            }
                            <TableCell align="right">{foodItem.calories}</TableCell>
                            <TableCell align="right">{foodItem.grams}</TableCell>
                            <TableCell align="right">{foodItem.nutDensity.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )
            })
          }
        </div>
        :
        'You have not generated any meals, please visit the Nutrition tab.'
      }
    </div>
  );
}

/*
                      { meal.routine_name.length > 0 ?
                        <TableRow sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                          <TableCell align="center">
                            Meal created for "{meal.routine_name}"
                          </TableCell>
                        </TableRow>
                        :
                        <TableRow sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                          <TableCell align="center">
                            Unassigned Meal
                          </TableCell>
                        </TableRow>
                      }
*/