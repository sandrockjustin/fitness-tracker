import React from 'react';
import Workout from './Workout.jsx';
//import workouts from App.jsx

//populate each workout list tied to the user's saved lists

const WorkoutList = ({usersWorkoutList}) => {
  console.log('usersworkoutlist', usersWorkoutList);
  return (
    <div>
      {usersWorkoutList.map((workouts, index) => {
        console.log('workouts', workouts);
        return (
          <Workout workouts={workouts} key={index} />
        )
      })}
    </div>
  )
}

export default WorkoutList;