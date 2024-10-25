import React, {useState, useEffect} from 'react';
import axios from 'axios';
import exampleWorkoutData from '../../../mock-data/exampleWorkouts';
import Workout from './Workout.jsx';
//should have search bar

//populates result window with results

//click on results to add to saved workout list

const WorkoutSearch = () => {
  //useStates
  const [searchQuery, setSearchQuery] = useState('');
  //state for mock data
  const [workout, setWorkout] = useState([]);
  //state for filtered mock data
  const [filteredResults, setFilteredResults] = useState([]);

  //handler to update state of searchQuery on inputChange
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClickEvent = () => {
    // filter exampleWorkoutData by search query
    // const results = workouts.filter(workout =>
    //   workout.name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    axios.get(`/WorkoutSearch/workouts/${searchQuery}`)
    .then((result) => {
      console.log('result returned', result);
      setFilteredResults(result.data);
    })
    .catch((error) => {
      console.error(`There was an error.`);
    })
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClickEvent();
        }}
      >
        <label htmlFor="query">Search Workouts:</label>
        <input
          type="search"
          id="query"
          name="query"
          placeholder="Type workout name..."
          required
          onChange={handleInputChange}
          value={searchQuery}
        />
        <button type="submit" onClick={handleClickEvent}>Search</button>
      </form>
      {filteredResults.map((workout, index) => {
        return (
         <Workout workout={workout} key={index}/>
        )
      })}
    </div>
  );
};

export default WorkoutSearch;