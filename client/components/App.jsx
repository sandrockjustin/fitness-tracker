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
		axios.get(`/user/info/`)
		  .then((userData) => {
				setUser(userData.data)
		  })
		  .catch((err) => {
			console.error('Failed to get userData');
		  })
	}

	function updateView(e) {

		console.log(e.target.name);
		switch (e.target.name){
			case 'Logout':
				axios.post('/user/logout')
					.then((response) => {
						if (response.status === 200){
							window.location.href = "http://localhost:8080/";
						}
					})
					.catch((error) => {
						console.error('Error on POST logout.')
					})
				break;
			case 'Workouts':
				axios.get('/user/workouts')
					.then((response) => {
						setView(response.data.view);
					})
					.catch((error) => {
						console.error('Error on GET workouts view in main.')
					})
				break;
			case 'Workouts-Search':
				axios.get('/user/workouts/search')
					.then((response) => {
						setView(response.data.view);
					})
					.catch((error) => {
						console.error('Error on GET workouts search view in main.')
					})
					break;
			case 'Nutrition':
				axios.get('/user/nutrition')
					.then((response) => {
						setView(response.data.view);
					})
					.catch((error) => {
						console.error('Error on GET nutrition view in main.')
					})
					break;
			default:
				console.error('Client error for update view in main.')
		}
	}

  const handleThemeChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

	useEffect(() => {
		setTimeout( () => {fetchUser()}, 0)
	}, [])



	switch(view){
		case 'Workouts':
			return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <IconButton onClick={handleThemeChange} color="inherit">
          <Brightness4Icon />
        </IconButton>
				<div id="root-app">
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
		case 'Workouts-Search':
			return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <IconButton onClick={handleThemeChange} color="inherit">
          <Brightness4Icon />
        </IconButton>
				<div id="root-app">
				<Navigation updateView={updateView}/>
					<div>
					<WorkoutSearch user={user} fetchUser={fetchUser}/>
					</div>
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
				<div id="root-app">
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
				<div id="root-app">
					<Navigation updateView={updateView}/>
				</div>
        </ThemeProvider>
			)
	}
}