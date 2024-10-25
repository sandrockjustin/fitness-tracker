import React from 'react';
import WorkoutList from './WorkoutList.jsx';
//render individual workout routine

//receives workouts as a prop from WorkoutList.jsx

const Workout = ({workout}) => {

  return (
    <div>{workout ? (workout.name) : ''}</div>
  )
}

export default Workout;
