import React from 'react';
import Workout from './Workout.jsx';
import { Box, IconButton, Typography, Container} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import useStyles from '../styles'

//populate each workout list tied to the user's saved lists

const WorkoutList = ({workouts, fetchUser, user}) => {
  const classes = useStyles();

  // function to handle delete requests in user's workout list
  const deleteWorkout = (workout) => {
    console.log('workout to be deleted', workout);
    axios.patch(`/user/workouts/delete`, {workout})
      .then(() => {
        fetchUser();
      })
      .catch((err) => {
        console.err('Failed to delete workout');
      })
  };

  return (
    <div>
    <Typography variant='h5' fontWeight='bold' fontFamily='Roboto' align='center' display='flex' justifyContent='center' >Saved Workout List</Typography>
    <Box
      className={classes.box}
      alignItems="center"
      justifyContent='center'
      justifyItems='center'
      alignContent='center'
    >
      {workouts.map((workout, index) => {
        return (
          <div
            className={classes.workoutSaved}
            key={index}
          >
            <IconButton onClick={() => deleteWorkout(workout)}>
            <DeleteForeverIcon fontSize='medium'/>
            </IconButton>
            <Workout className={classes.workouts} workout={workout} key={index} />
          </div>
        );
      })}
    </Box>
    </div>
  );
};

export default WorkoutList;