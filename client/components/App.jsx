import React, { useState, useEffect } from 'react';
import WorkoutSearch from './workouts/WorkoutSearch.jsx';
import WorkoutList from './workouts/WorkoutList.jsx';
import Nutrition from './nutrition/Nutrition.jsx';
import Navigation from './Navigation.jsx'
import axios from 'axios';

export default function App() {

	const [view, setView] = useState('WorkoutList');
	const [user, setUser] = useState(null);

	// function fetchUser() {
	// 	axios.get(`/user/info/`)
	// 	  .then((userData) => {
	// 			setUser(userData.data)
	// 	  })
	// 	  .catch((err) => {
	// 		console.error('Failed to get userData');
	// 	  })
	// }

	/*
		What are the req.session and req.cookies?
		This would reflect the current user or userID
		We can use that to search in the database
	*/
	
	function updateView(e) {
		if (e.target.name === 'Logout'){
			axios.post('/logout')
				.catch((error) => {
					console.error('Error during logout.')
				})
		}

		setView(e.target.name)
	}

	useEffect(() => {
		// fetchUser();
	}, [])
	

		
	switch(view){
		case 'WorkoutList':
			return (
				<div id="root-app">Fitness Tracker
				<Navigation updateView={updateView}/>	
				{user ?
					<div>
					<WorkoutList workouts={user.workouts}/>
					</div>
					:
					<div>
					<h1>Please Login</h1>
					</div>
					}
				</div>				
			)
		case 'WorkoutSearch':
			return (
				<div id="root-app">Fitness Tracker
				<Navigation updateView={updateView}/>	
				{user ?
					<div>
					<WorkoutSearch/>
					</div>
					:
					<div>
					<h1>Please Login</h1>
					</div>
					}
				</div>
			)
		case 'Nutrition':
			return (
				<div id="root-app">Fitness Tracker
					<Navigation updateView={updateView}/>					
					<div><Nutrition/></div>
				</div>
			)
		default:
			return (
				<div id="root-app">Fitness Tracker
					<Navigation updateView={updateView}/>
					<div>LOGIN component has not been implemented.</div>
				</div>
			)
	}
	
}