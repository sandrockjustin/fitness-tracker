import React from 'react';
import Workout from './Workout.jsx';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
//import workouts from App.jsx

//populate each workout list tied to the user's saved lists

const WorkoutList = ({workouts, fetchUser, user}) => {
  // console.log('usersworkoutlist', usersWorkoutList);

  // function to handle delete requests in user's workout list
  const deleteWorkout = (workout) => {
    console.log('workout to be deleted', workout);
    axios.patch(`/WorkoutList/deleteWorkout/${user._id}`, {workout})
      .then(() => {
        fetchUser();
      })
      .catch((err) => {
        console.err('Failed to delete workout');
      })
  };

  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        flexDirection: 'row',
        gap: 2,
        padding: '10px',
        
      }}
    >
      {workouts.map((workout, index) => {
        return (
          <div
            key={index}
            style={{
              flex: '1 1 30%',
              maxHeight: '500px',
              overflowY: 'auto',
              minWidth: '300px',
              padding: '10px',
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', 
              boxSizing: 'border-box',
              position: 'relative'}}>
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
              }}
              onClick={() => deleteWorkout(workout)}
            >
              <DeleteIcon />
            </IconButton>
            <Workout workout={workout} key={index} />
          </div>
        );
      })}
    </Box>
  );
};

export default WorkoutList;