import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useState} from 'react';



export default function BasicMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  
  const handleClose = (e) => {
    setAnchorEl(null);
    // console.log("EVENT TARGET", e.target)
  };

  // console.log("!!!!!!!!!!!!", props.routines)

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{backgroundColor: 'rgba(0, 0, 0, .2)', color: 'rgba(220, 220, 220, .5)', "&:hover": { backgroundColor: 'rgba(140, 140, 140, .4)', color: 'rgba(240, 240, 240, .5)'}}}
      >
        SELECT WORKOUT ROUTINE: {props.currentRoutineName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {props.routines.map(routine=>{
          return(
            <MenuItem 
            key={`${routine.routine_name}`}
            routine={routine.exercises} 
            onClick={(e)=>{
              props.setCurrentRoutine(routine.exercises)
              props.setCurrentRoutineName(routine.routine_name)
              handleClose(e)}}
            >
              {routine.routine_name}
            </MenuItem>
          )
        })}
 
      </Menu>
    </div>
  );
}