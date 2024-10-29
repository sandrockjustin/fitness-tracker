import React from 'react';

export default function Navigation(props) {

  return (
    <nav>
      <button type="button" onClick={(e) => props.updateView(e)}  name="Workouts">Current Workouts</button>
      <button type="button" onClick={(e) => props.updateView(e)}  name="Workouts-Search">Search Workouts</button>
      <button type="button" onClick={(e) => props.updateView(e)}  name="Nutrition">Nutrition Helper</button>
      <button type="button" onClick={(e) => props.updateView(e)}  name="Logout">Logout</button>									
    </nav>
  )

}