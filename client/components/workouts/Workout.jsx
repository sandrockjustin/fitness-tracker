import React from 'react';
import WorkoutList from './WorkoutList.jsx';
//render individual workout routine

//receives workouts as a prop from WorkoutList.jsx

const Workout = ({workout, onClick}) => {
  if(onClick) {
    return (
      <div onClick={onClick}>{workout ? (
        <div className='workout-name'>
          {workout.name}
        </div>
      ) : ''}
      </div>
    )
  } else {
    return (
      <div>{workout ? (workout.name) : ''}</div>
    )
  }
}

export default Workout;
