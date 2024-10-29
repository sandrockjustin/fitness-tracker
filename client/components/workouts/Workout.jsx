import React from 'react';
import WorkoutList from './WorkoutList.jsx';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useStyles from '../styles';
//render individual workout routine

//receives workouts as a prop from WorkoutList.jsx

const Workout = ({workout, onClick}) => {
  const classes = useStyles();
  const { name, type, muscle, equipment, difficulty, instructions } = workout; 

  if(onClick) {
    return (
      <Box
        className={classes.text}
        onClick={onClick}
        sx={{
          padding: 1,
          border: '1px solid #007bff',
          borderRadius: 4,
          minWidth: '150px',
          boxShadow: 2,
        }}
      >
        <Typography className={classes.text} variant="h6">{name}</Typography>
        <Typography className={classes.text} variant="body2">Type: {type}</Typography>
        <Typography className={classes.text} variant="body2">Muscle: {muscle}</Typography>
        <Typography className={classes.text} variant="body2">Equipment: {equipment}</Typography>
        <Typography className={classes.text} variant="body2">Difficulty: {difficulty}</Typography>

        <Accordion sx={{ marginTop: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={(e) => e.stopPropagation()}>
            <Typography>Instructions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{instructions}</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    )
  } else {
    return (
      <Box
        sx={{
          padding: 1,
          border: '1px solid #007bff',
          borderRadius: 4,
          minWidth: '150px',
          boxShadow: 2,
        }}
      >
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">Type: {type}</Typography>
        <Typography variant="body2">Muscle: {muscle}</Typography>
        <Typography variant="body2">Equipment: {equipment}</Typography>
        <Typography variant="body2">Difficulty: {difficulty}</Typography>
  
        <Accordion sx={{ marginTop: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Instructions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{instructions}</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  }
}

export default Workout;
