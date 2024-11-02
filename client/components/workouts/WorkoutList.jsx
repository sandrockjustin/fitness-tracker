import React, { useState } from "react";
import Workout from "./Workout.jsx";
import { Box, IconButton, Typography, Divider, FormControl, OutlinedInput, InputLabel, Button, Snackbar} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import useStyles from "../styles";
import Alert from '@mui/material/Alert';

//populate each workout list tied to the user's saved lists

const WorkoutList = ({ workouts, fetchUser, user }) => {
  //creates instance of style object in styles.js
  const classes = useStyles();
 
  const [routineName, setRoutineName] = useState('');
  //state for success alert when adding workout on add button click
  const [open, setOpen] = useState(false);
  // function to handle delete requests in user's workout list
  const deleteWorkout = (workout) => {
    axios
      .patch(`/user/workouts/delete`, { workout })
      .then(() => {
        fetchUser();
      })
      .catch((err) => {
        console.err("Failed to delete workout");
      });
  };
  const saveRoutine = () => {
    axios.post('/user/routines/create', {routine_name: routineName, exercises: workouts})
    .then(() => {
      fetchUser();
      //sets alert state to appear
      setOpen(true);
    })
    .catch((err) => {
      console.error('Failed to save routine');
    });
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%', transform: 'scale(2.0)' }}>
          Routine added successfully!
        </Alert>
      </Snackbar>
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        display="flex"
        justifyContent="center"
        paddingTop="50px"
        paddingBottom="30px"
      >
        Saved Workout List
      </Typography>
      <Divider />
      <br></br>
      <Box className={classes.box} sx={{display: 'flex', justifyContent: 'center'}}>
        <FormControl sx={{width: '300px'}} >
          <InputLabel sx={{color: 'black', '&.Mui-focused': { color: 'black' }, '&.MuiFormLabel-filled': { color: 'black' }}}>Enter a Routine name</InputLabel>
          <OutlinedInput
            label="Enter a Routine name"
            onChange={(e) => setRoutineName(e.target.value)}
            sx={{
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
        </FormControl>
        <Button variant="text" onClick={() => saveRoutine()} sx={{color: 'black'}} className={classes.routineAdd}>Save Routine</Button>
      </Box>
      <Divider />
      <Box
        className={classes.box}
        sx={{
          overflowX: "auto",
          justifyContent: "flex-start",
          width: "100%",
          padding: "10px",
          alignItems: "center",
        }}
      >
        {workouts.map((workout, index) => {
          return (
            <div className={classes.workoutSaved} key={index}>
              <IconButton onClick={() => deleteWorkout(workout)}>
                <DeleteForeverIcon fontSize="medium" />
              </IconButton>
              <Workout
                className={classes.workouts}
                workout={workout}
                key={index}
                onClick={() => handleSelectWorkout(workout)}
              />
            </div>
          );
        })}
      </Box>
      <Divider />
    </div>
  );
};

export default WorkoutList;
