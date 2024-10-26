import React, { useState, useEffect } from 'react';
import WorkoutSearch from './workouts/WorkoutSearch.jsx';
import WorkoutList from './workouts/WorkoutList.jsx';
import Nutrition from './nutrition/Nutrition.jsx';
import Navigation from './Navigation.jsx'
import axios from 'axios';
import { ThemeProvider, CssBaseline, Switch, IconButton } from '@mui/material';
import { lightTheme, darkTheme } from './styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';



export default function App() {
  //theme toggle light/dark
  const [darkMode, setDarkMode] = useState(false);
	const [view, setView] = useState('WorkoutList');
	const [user, setUser] = useState(null);

	function fetchUser() {
		axios.get(`/user/info/${'Jeremy Hernandez'}`)
		  .then((userData) => {
				setUser(userData.data)
		  })
		  .catch((err) => {
			console.error('Failed to get userData');
		  })
	}

	function updateView(e) {
		if (e.target.name === 'Logout'){
			axios.post('/logout')
				.catch((error) => {
					console.error('Error during logout.')
				})
		}

		setView(e.target.name)
	}

  const handleThemeChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

	useEffect(() => {
		// fetchUser();
	}, [])



	switch(view){
		case 'WorkoutList':
			return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <IconButton onClick={handleThemeChange} color="inherit">
          <Brightness4Icon />
        </IconButton>
				<div id="root-app">Fitness Tracker
				<Navigation updateView={updateView}/>
				{user ?
					<div>
					<WorkoutList user={user} fetchUser={fetchUser} workouts={user.workouts}/>
					</div>
					:
					<div>
					<h1>Please Login</h1>
					</div>
					}
				</div>
        </ThemeProvider>
			)
		case 'WorkoutSearch':
			return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <IconButton onClick={handleThemeChange} color="inherit">
          <Brightness4Icon />
        </IconButton>
				<div id="root-app">Fitness Tracker
				<Navigation updateView={updateView}/>
				{user ?
					<div>
					<WorkoutSearch user={user} fetchUser={fetchUser}/>
					</div>
					:
					<div>
					<h1>Please Login</h1>
					</div>
					}
				</div>
        </ThemeProvider>
			)
		case 'Nutrition':
			return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <IconButton onClick={handleThemeChange} color="inherit">
          <Brightness4Icon />
        </IconButton>
				<div id="root-app">Fitness Tracker
					<Navigation updateView={updateView}/>
					<div><Nutrition fetchUser={fetchUser} user={user}/></div>
				</div>
        </ThemeProvider>
			)
		default:
			return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <IconButton onClick={handleThemeChange} color="inherit">
          <Brightness4Icon />
        </IconButton>
				<div id="root-app">Fitness Tracker
					<Navigation updateView={updateView}/>
					<div>LOGIN component has not been implemented.</div>
				</div>
        </ThemeProvider>
			)
	}
}