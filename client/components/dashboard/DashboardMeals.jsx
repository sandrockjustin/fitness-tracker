import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DashboardMeals(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pantry Item</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Calories&nbsp;</TableCell>
            <TableCell align="right">Serving Size&nbsp;(g)</TableCell>
            <TableCell align="right">Nutritional Density&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.nutrition.map((foodItem) => (
            <TableRow
              key={foodItem.foodName}
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
  );
}