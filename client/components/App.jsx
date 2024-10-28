import React, { useState, useEffect } from 'react';
import WorkoutSearch from './workouts/WorkoutSearch.jsx';
import WorkoutList from './workouts/WorkoutList.jsx';
import Nutrition from './nutrition/Nutrition.jsx';
import Navigation from './Navigation.jsx'
import axios from 'axios';

export default function App() {

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
			
			setView('');
			return;
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
					<WorkoutList user={user} fetchUser={fetchUser} workouts={user.workouts}/>
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
					<WorkoutSearch user={user} fetchUser={fetchUser}/>
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
					<div><Nutrition fetchUser={fetchUser} user={user}/></div>
				</div>
			)
		default:
			return (
				<div id="root-app">Fitness Tracker
					<Navigation updateView={updateView}/>
					<button type="button">Log in with Google</button>
				</div>
			)
	}
}