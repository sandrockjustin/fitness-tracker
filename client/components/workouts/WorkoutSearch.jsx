import React, {useState, useEffect} from 'react';
import axios from 'axios';
import exampleWorkoutData from '../../../mock-data/exampleWorkouts';
import Workout from './Workout.jsx';
import {Button, FormControl} from '@mui/material';

const WorkoutSearch = () => {
  //useStates
  const [searchQuery, setSearchQuery] = useState('');

  //state for filtered mock data
  const [filteredResults, setFilteredResults] = useState([]);

  //handler to update state of searchQuery on inputChange
  const handleInputChange = (e) => {

    setSearchQuery(e.target.value);
  };

  const handleClickEvent = () => {
    //on click event, send get request for workouts to server
    axios.get(`/WorkoutSearch/workouts/${searchQuery}`)
    .then((result) => {
      // console.log('result returned', result);
      //setState for results from API
      setFilteredResults(result.data);
      //reset input field
      setSearchQuery('');
    })
    .catch((error) => {
      console.error(`There was an error.`);
    })
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <FormControl
        sx={{
          width: 500,
          alignContent: 'center'
         }}
        onSubmit={(e) => {
          e.preventDefault();
          handleClickEvent();
        }}
      >
        <label htmlFor="query">Search Workouts for Muscle Group:</label>
        <input
          type="search"
          id="query"
          name="query"
          placeholder="Type workout name..."
          required
          onChange={handleInputChange}
          value={searchQuery}
        />
        <Button variant='outlined'
         sx={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          }}
         type="submit"
         onClick={handleClickEvent}>Search
         </Button>
      </FormControl>
      <div name='results'>
        <h3>Workout results</h3>
        {filteredResults.map((workout, index) => {
          return (
          <Workout workout={workout}
            key={index}
            onClick={() => console.log('Workout added to users workoutList')}/>
          )
        })}
      </div>
    </div>
  );
};

export default WorkoutSearch;