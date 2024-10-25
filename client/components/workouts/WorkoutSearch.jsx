import React, {useState, useEffect} from 'react';
import axios from 'axios';
import exampleWorkoutData from '../../../mock-data/exampleWorkouts';
//should have search bar

//populates result window with results

//click on results to add to saved workout list

const WorkoutSearch = () => {
  //useStates
  const [searchQuery, setSearchQuery] = useState('');
  //state for mock data
  const [workouts, setWorkouts] = useState(exampleWorkoutData);
  //state for filtered mock data
  const [filteredResults, setFilteredResults] = useState([]);

  //handler to update state of searchQuery on inputChange
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClickEvent = () => {
    // filter exampleWorkoutData by search query
    const results = workouts.filter(workout =>
      workout.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResults(results);
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
        <button type="submit">Search</button>
      </form>

      <div>
        {filteredResults.map((workout) => (
          <div key={workout.id}>
            {workout.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutSearch;