import React from 'react';

export default function Navigation(props) {

  return (
    <nav>
      <button type="button" onClick={(e) => props.updateView(e)}  name="WorkoutList">Current Workouts</button>
      <button type="button" onClick={(e) => props.updateView(e)}  name="WorkoutSearch">Search Workouts</button>
      <button type="button" onClick={(e) => props.updateView(e)}  name="Nutrition">Nutrition Helper</button>
      <button type="button" onClick={(e) => props.updateView(e)}  name="Logout">Logout</button>									
    </nav>
  )

}