import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DashboardWorkouts(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exercise</TableCell>
            <TableCell align="right">Target Group</TableCell>
            <TableCell align="right">Type&nbsp;</TableCell>
            <TableCell align="right">Equipment&nbsp;</TableCell>
            <TableCell align="right">Difficulty&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.workouts.map((workout) => (
            <TableRow
              key={workout.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {workout.name}
              </TableCell>
              <TableCell align="right">{workout.muscle}</TableCell>
              <TableCell align="right">{workout.type}</TableCell>
              <TableCell align="right">{workout.equipment.replaceAll("_", " ")}</TableCell>
              <TableCell align="right">{workout.difficulty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}