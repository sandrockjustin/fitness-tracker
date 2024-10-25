import React, {useState, useEffect} from 'react'
import WorkoutSearch from './workouts/WorkoutSearch.jsx';
import WorkoutList from './workouts/WorkoutList.jsx';
//importing everything into the App component
export default function App(){
  const [user, setUser] = useState(null);
  const [usersWorkoutList, setWorkoutList] = useState([]);

  //useEffect to fetch user info on start up
  // useEffect(() => {
  //   const fetchedUser = axios.get()
  // })
  return (
    <div id="root-app">hello there world
    {!user ? (
      <div>
      <WorkoutSearch />
      <WorkoutList usersWorkoutList={usersWorkoutList}/>
      </div>
    ) : (
      <div>
        <h1>Please Login</h1>
      </div>
    )
      }
    </div>
  )
}



//render login page view


//render authenticated user view

//app performs axios get request for user on useEffect

//setState hook

//refresh on state change
