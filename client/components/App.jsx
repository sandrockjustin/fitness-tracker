import React, {useState, useEffect} from 'react'
import WorkoutSearch from './workouts/WorkoutSearch.jsx';
import WorkoutList from './workouts/WorkoutList.jsx';
import axios from 'axios';
//importing everything into the App component
export default function App(){
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  //fetch user info
  const fetchUser = () => {
    axios.get(`/user/info/${'Jeremy Hernandez'}`)
      .then((userData) => {
        setUser(userData.data);
        
        // console.log('userData', userData);
      })
      .catch((err) => {
        console.err('Failed to get userData');
      })
  }
  //useEffect to fetch user info on start up
  useEffect(() => {
   fetchUser();
    
  }, []);
  setTimeout(console.log, 5000, user);
  return (
    <div id="root-app">hello there world
    {user ?
      <div>
      <WorkoutSearch />
      <WorkoutList workouts={workouts}/>
      </div>
     :
      <div>
        <h1>Please Login</h1>
      </div>
      }
    </div>
  )
}



//render login page view


//render authenticated user view

//app performs axios get request for user on useEffect

//setState hook

//refresh on state change
