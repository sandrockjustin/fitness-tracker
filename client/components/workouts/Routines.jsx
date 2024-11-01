import React, {useState} from 'react';
import axios from 'axios';
import useStyles from '../styles';
import {Box, FormControl, Button, IconButton, InputLabel, Select, MenuItem, Snackbar} from '@mui/material';
import Workout from './Workout.jsx';
import CloseIcon from "@mui/icons-material/Close";
import Alert from '@mui/material/Alert';

const Routines = ({fetchUser, routines, user}) => {
  console.log('rooutines,', routines)
  const classes = useStyles();

  //state for selected workout
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [open, setOpen] = useState(false);
  //function to set the state of selected workout on click
  const handleSelectWorkout = (workout) => {
    setSelectedWorkout(workout);
  };
  //function to clear selected workout view
  const deselectWorkout = () => {
    setSelectedWorkout(null);
  };
  //handles selection of routine to display
  const handleRoutineSelect = (event) => {
    const routine = event.target.value;
    setSelectedRoutine(routine);
  };

  const deleteRoutine = () => {
    if(!selectedRoutine) {
      return;
    } else {
      console.log('routine to delete', selectedRoutine);
        axios
          .delete(`/user/routines/delete/${selectedRoutine._id}`)
          .then(() => {
            setSelectedRoutine(null);
            setSelectedWorkout(null);
            fetchUser();
            setOpen(true);
          })
          .catch((err) => {
            console.error("Failed to delete workout");
          });
    }
  };


  return (
    <div style={{padding: '10px', justifyItems: 'center'}}>
      <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%', transform: 'scale(2.0)' }}>
          Routine added successfully!
        </Alert>
      </Snackbar>
      <h2>Saved Routines</h2>
      <h5>Select a saved Routine to display</h5>
       <Box sx={{display: 'flex', justifyContent: 'center', color: 'black', padding: '5px'}}>
      <FormControl sx={{ width: 300, alignContent: "center" }}>
        <InputLabel
          id="routine"
          sx={{
            paddingLeft: '50px',
            textAlign: 'center',
            color: 'black',
            '&.Mui-focused': { color: 'black' },
            '&.MuiFormLabel-filled': { color: 'black' }}}>
        </InputLabel>
        <Select
          id="routine"
          value={selectedRoutine || ""}
          onChange={handleRoutineSelect}
          displayEmpty
          sx={{
            textAlign: 'center',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'lightblue',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
            color: 'black',
          }}
        >
          <MenuItem value="" disabled>
          </MenuItem>
          {routines.map((routine) => (
            <MenuItem key={routine._id} value={routine}>
              {routine.routine_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ width: "100%", textAlign: "center", marginBottom: "10px" }}>
      <h4>These are the workouts in "{selectedRoutine?.routine_name}"</h4>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button 
          type='button'
          sx={{
            color: 'white',
            background: 'linear-gradient(90deg, #556270 0%, #FF6B6B  51%, #556270  100%)',
            '&:hover': { background: 'linear-gradient(90deg, #ff4b1f 0%, #ff9068  51%, #ff4b1f  100%)'},
            "&:active": {
              transform: "scale(0.98)",
             }
          }}
          onClick={() => deleteRoutine()}
          > Delete Saved Routine
        </Button>
      </div>
      
    </Box>
    <Box 
      className={classes.box4Routines}
      sx={{
        overflowX: "auto",
        justifyContent: "flex-start",
        width: "100%",
        padding: "20px",
        alignItems: "center",
        border: "1px solid lightgray",
        borderRadius: "8px",
      }}
    >
        {/* Display workouts in the selected routine */}
        {selectedRoutine && selectedRoutine.exercises ? (
          selectedRoutine.exercises.map((workout, index) => (
            <div className={classes.workoutSaved} style={{paddingTop: '20px', paddingBottom: '20px'}} key={`${workout.name}-${index}`}>
              <Workout className={classes.workouts} workout={workout} onClick={() => handleSelectWorkout(workout)} key={`${workout.name}-${index}`} />
            </div>
          ))
        ) : (
          <p style={{textAlign: 'center', width: '100%'}}>No workouts available in the selected routine</p>
        )}
    </Box>
      <Box>
        {selectedWorkout ? (
          <div>
            <div
              style={{
                fontWeight: "bold",
                fontFamily: "Roboto",
                align: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Selected Workout
            </div>
            <br></br>
            <div className={classes.workoutSelected}>
              <IconButton
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  background: "#F1F1F1",
                  boxShadow: 2,
                }}
                onClick={() => deselectWorkout()}
              >
                <CloseIcon fontSize="medium" sx={{color: 'red'}} />
              </IconButton>
              <br></br>
              <Workout
                className={classes.workoutSaved}
                workout={selectedWorkout}
              />
            </div>
          </div>
        ) : null}
      </Box>
    </div>
  )
};

export default Routines;