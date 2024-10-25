import React from 'react';
import Workout from './Workout.jsx';
//import workouts from App.jsx

//populate each workout list tied to the user's saved lists

const WorkoutList = ({workouts}) => {
  // console.log('usersworkoutlist', usersWorkoutList);
  return (
    <div>
      {workouts.map((workout, index) => {
        console.log('workout', workout);
        return (
          <Workout workout={workout} key={index} />
        )
      })}
    </div>
  )
}

export default WorkoutList;