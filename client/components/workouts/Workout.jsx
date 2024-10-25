import React from 'react';
import WorkoutList from './WorkoutList.jsx';
//render individual workout routine

//receives workouts as a prop from WorkoutList.jsx

const Workout = ({workouts}) => {

  return (
    <div>{workouts}</div>
  )
}

export default Workout;
