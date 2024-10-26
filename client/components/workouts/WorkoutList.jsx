import React from 'react';
import Workout from './Workout.jsx';
import { Container } from '@mui/material';

//import workouts from App.jsx

//populate each workout list tied to the user's saved lists

const WorkoutList = ({workouts}) => {
  // console.log('usersworkoutlist', usersWorkoutList);
  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      padding: 3,
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      alignContent: "flex-start",
      margin: '0 auto',
      marginLeft: 0
    }}>
      {workouts.map((workout, index) => {
        console.log('workout', workout);
        return (
          <Workout workout={workout} key={index} />
        )
      })}
    </Container>
  )
}

export default WorkoutList;