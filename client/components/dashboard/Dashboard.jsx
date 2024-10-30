import React from 'react';
import DashboardWorkouts from './DashboardWorkouts.jsx';
import DashboardMeals from './DashboardMeals.jsx';
import { Divider } from '@mui/material';

export default function Dashboard(props) {
  console.log(props);
  return (
    <div id="dash_main">
      <h1 style={{textAlign: "center"}}>Dashboard</h1>
      <Divider/>
      <div id="dash_container" style={{display: "flex", flexDirection: "row", paddingTop: "35px", justifyContent: "center"}}>
        <div id="dash_workouts" style={{paddingRight:"20px"}}>
          <DashboardWorkouts workouts={props.user.workouts}/>
        </div>
        <div id="dash_meals">
          <DashboardMeals nutrition={props.user.nutrition}/>
        </div>
      </div>
    </div>
  );
}