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
		axios.get(`/user/info/`)
		  .then((userData) => {
				setUser(userData.data)
		  })
		  .catch((err) => {
			console.error('Failed to get userData');
		  })
	}

	function updateView(e) {

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

	useEffect(() => {
		setTimeout( () => {fetchUser()}, 0)
	}, [])



	switch(view){
		case 'Workouts':
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
		case 'Workouts-Search':
			return (
				<div id="root-app">Fitness Tracker
				<Navigation updateView={updateView}/>
					<div>
					<WorkoutSearch user={user} fetchUser={fetchUser}/>
					</div>
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