import React from 'react';
import Workout from './Workout.jsx';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

//import workouts from App.jsx

//populate each workout list tied to the user's saved lists

const WorkoutList = ({workouts}) => {
  // console.log('usersworkoutlist', usersWorkoutList);
  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        flexDirection: 'row',
        gap: 2,
        padding: '10px',
      }}
    >
      {workouts.map((workout, index) => {
        return (
          <div
            key={index}
            style={{flex: '1 1 30%', maxHeight: '500px', overflowY: 'auto', minWidth: '500px', padding: '10px', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', boxSizing: 'border-box', position: 'relative'}}>
            <IconButton
              sx={{ 
                position: 'absolute', 
                top: 8, 
                right: 8, 
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
              }}
              onClick={() => console.log('Deleted item')}
            >
              <DeleteIcon />
            </IconButton>
            <Workout workout={workout} key={index} />
          </div>
        );
      })}
    </Box>
  );
};

export default WorkoutList;