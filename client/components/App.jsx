import React, { useState, useEffect } from 'react';
import WorkoutSearch from './workouts/WorkoutSearch.jsx';
import WorkoutList from './workouts/WorkoutList.jsx';
import Nutrition from './nutrition/Nutrition.jsx';
import Navigation from './navigation/Navigation.jsx';
import Routines from './workouts/Routines.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import AccountPage from './navigation/AccountPage.jsx';
import axios from 'axios';
import { ThemeProvider, CssBaseline, Switch, IconButton } from '@mui/material';
import { lightTheme, darkTheme } from './styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import CurrentMealPlans from './nutrition/CurrentMealPlans.jsx';


export default function App() {
  //theme toggle light/dark
  const [darkMode, setDarkMode] = useState(false);
	const [view, setView] = useState('Dashboard');
	const [user, setUser] = useState(null);
	const [routines, setRoutines] = useState(null);

	function fetchUser() {
		axios.get(`/user/info/`)
		  .then((userData) => {
				setUser(userData.data)
		  })
		  .catch((err) => {
				console.error('Failed to get userData');
		  })

		axios.get(`/user/routines/all`)
			.then((userRoutines) => {
				setRoutines(userRoutines.data)
			})
			.catch((err) => {
				console.error('Failed to fetch userRoutines.')
			})
	}

	function updateView(e) {

		switch (e.target.name){
			case 'Logout':
				axios.post('/user/logout')
					.then((response) => {
						if (response.status === 200){
							window.location.href = "http://ec2-3-23-88-112.us-east-2.compute.amazonaws.com:8080/";
						}
					})
					.catch((error) => {
						console.error('Error on POST logout in main.', error)
					})
				break;
			case 'Workouts':
				axios.get('/user/workouts')
					.then((response) => {
						setView(response.data.view);
					})
					.catch((error) => {
						console.error('Error on GET workouts view in main.', error)
					})
				break;
			case 'Workouts-Search':
				axios.get('/user/workouts/search')
					.then((response) => {
						setView(response.data.view);
					})
					.catch((error) => {
						console.error('Error on GET workouts search view in main.', error)
					})
					break;
			case 'Nutrition':
				axios.get('/user/nutrition')
					.then((response) => {
						setView(response.data.view);
					})
					.catch((error) => {
						console.error('Error on GET nutrition view in main.', error)
					})
					break;
			case 'Routines':
				axios.get('/user/routines')
					.then((response) => {
						setView(response.data.view);
					})
					.catch((error) => {
						console.error('Error on GET routines view in main.', error)
					})
				break;
			case 'Delete Account':
				const warningMessage = `Are you sure that you would like to delete your account?\nThis action is irreversible.`
				if (window.confirm(warningMessage)){
					axios.delete('/user/delete')
						.then((response) => {
							if (response.status === 200){
								window.location.href = "http://ec2-3-23-88-112.us-east-2.compute.amazonaws.com:8080/";
							}
						})
						.catch((error) => {
							console.error('Error on DELETE user in main.', error)
						})
				} else {
					return;
				}

			case 'Dashboard':
				axios.get('/user/dashboard')
					.then((response) => {
						setView(response.data.view);
					})
					.catch((error) => {
						console.error('Error on GET nutrition view in main.', error)
					})
					break;
			
			case 'Account Page':
				axios.get('/user/account/')
					.then((response) => {
						setView(response.data.view);
					})
					.catch((error) => {
						console.error('Error on GET account page view in main.', error)
					})
					break;
			case 'Meal Plans':
				axios.get('/user/nutrition/meals')
					.then((response) => {
						setView(response.data.view);
					})
					.catch((error) => {
						console.error('Error on GET account page view in main.', error)
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
		document.title = 'Vitality';
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
				<br></br>
				{user ?
					<div>
					<WorkoutList user={user} fetchUser={fetchUser} workouts={user.workouts}/>
					</div>
					:
					<div>
						<h1 style={{textAlign:"center"}}>401</h1>
						<h2 style={{textAlign:"center"}}>Unauthorized; please re-attempt login.</h2>
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
				<br></br>
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

					<br></br>
					<div><Nutrition state={darkMode} fetchUser={fetchUser} user={user} routines={routines}/></div>

				</div>
        </ThemeProvider>
			)
			case 'Routines':
				return (
					<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
						<CssBaseline />
						<IconButton onClick={handleThemeChange} color="inherit">
						<Brightness4Icon />
					</IconButton>
					<div id="root-app">
					<Navigation updateView={updateView}/>
					<br></br>
					{user ?
						<div>
						<Routines user={user} fetchUser={fetchUser} routines={routines} workouts={user.workouts}/>
						</div>
						:
						<div>
							<h1 style={{textAlign:"center"}}>401</h1>
							<h2 style={{textAlign:"center"}}>Unauthorized; please re-attempt login.</h2>
						</div>
						}
					</div>
					</ThemeProvider>
				)
		case 'Account Page':
			return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <IconButton onClick={handleThemeChange} color="inherit">
          <Brightness4Icon />
        </IconButton>
				<div id="root-app">
					<Navigation updateView={updateView}/>
					<br></br>
					<div><AccountPage state={darkMode} user={user} updateView={updateView} fetchUser={fetchUser}/></div>
				</div>
        </ThemeProvider>
			)
		case 'Meal Plans':
			return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <IconButton onClick={handleThemeChange} color="inherit">
          <Brightness4Icon />
        </IconButton>
				<div id="root-app">
					<Navigation updateView={updateView}/>
					<br></br>
					<div><CurrentMealPlans state={darkMode} user={user} updateView={updateView} fetchUser={fetchUser}/></div>
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
					{user ?
					<div>
						<Dashboard user={user}/>
					</div>
					:
					<div>
						<h1 style={{textAlign:"center"}}>401</h1>
						<h2 style={{textAlign:"center"}}>Unauthorized; please re-attempt login.</h2>
					</div>
					}
				</div>
        </ThemeProvider>
			)
	}
}
