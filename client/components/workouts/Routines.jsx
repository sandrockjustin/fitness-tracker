import React, {useState} from 'react';
import axios from 'axios';
import useStyles from '../styles';
import {Box, FormControl, IconButton, Select, MenuItem, Snackbar, TextField, Divider} from '@mui/material';
import Workout from './Workout.jsx';
import CloseIcon from "@mui/icons-material/Close";
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const Routines = ({fetchUser, routines, user}) => {
  const classes = useStyles();

  //state for selected workout
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [routineName, setRoutineName] = useState("");
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
    setRoutineName(routine.routine_name);
  };

  const deleteRoutine = () => {
    if(!selectedRoutine) {
      return;
    } else {
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
  ////////////////////////////////////////////////////
  //routine name edit handlers
  const handleEditClick = () => {
      setIsEditing(true);
  };

  const handleSaveClick = () => {
      // Call the update function and pass the new name
      updateRoutineName();
      setIsEditing(false);
  };

   // update routine name on server
   const updateRoutineName = () => {
   axios.patch(`/user/routines/update/${selectedRoutine._id}`, {name: routineName})
    .then(() => {
      setSelectedRoutine(null);
      setSelectedWorkout(null);
      fetchUser();
    })
    .catch((err) => {
      console.error('Failed to update routine name')
    })
  }
  ////////////////////////////////////////////////////

  return (
    <div style={{padding: '10px', justifyItems: 'center'}}>
      <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%', transform: 'scale(2.0)' }}>
          Routine added successfully!
        </Alert>
      </Snackbar>
      <h2>Saved Routines</h2>
      <Divider sx={{width: '100%'}}/>
      <h5>Select a saved Routine to display</h5>
      <Box sx={{ display: 'flex', justifyContent: 'center', color: 'black', paddingLeft: '150px' }}>
        <FormControl sx={{ width: 600, alignContent: "center" }}>
          {isEditing ? (
            <div style={{alignContent: 'center', paddingLeft: '50px'}}>
            <TextField
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              onBlur={handleSaveClick}
              autoFocus
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
            />
            </div>
          ) : (
            <Select
              id="routine"
              value={selectedRoutine || ""}
              onChange={(e) => handleRoutineSelect(e)}
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
                color: '#B0BEC5',
              }}
            >
              <MenuItem value="" disabled >
                Select a routine
              </MenuItem>
              {routines.map((routine) => (
                <MenuItem key={routine._id} value={routine}>
                  {routine.routine_name}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
        <IconButton onClick={isEditing ? handleSaveClick : handleEditClick} sx={{marginBottom: '10px', margin: '10px', paddingBottom: '10px', marginRight: '20px' }}>
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </IconButton>
        <IconButton onClick={() => deleteRoutine()} sx={{margin: '10px', paddingBottom: '10px', marginBottom: '10px'}}>
          <DeleteForeverIcon sx={{color:'red'}} />
        </IconButton>
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