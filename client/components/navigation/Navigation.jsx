import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import useStyles from '../styles';
import AccountMenu from './AccountMenu.jsx';

function Navigation(props) {

  const nav_classes = useStyles();

  return (
    <AppBar position="static" >
      <Container maxWidth="100%" className={nav_classes.navBar}>
        <Toolbar sx={{justifyContent: "space-between"}}>
          <Container sx={{display: 'flex', flexDirection: 'row'}}>
            <img src='https://i.imgur.com/ZX5wc9L.png' style={{width: "20%", height: "20%"}}/>
            <Button type="button" onClick={(e) => props.updateView(e)}  className={nav_classes.navButtons} name="Dashboard" sx={{color: 'white'}}>Dashboard</Button>
            <Button type="button" onClick={(e) => props.updateView(e)}  className={nav_classes.navButtons} name="Routines" sx={{color: 'white'}}>Routines</Button>
            <Button type="button" onClick={(e) => props.updateView(e)}  className={nav_classes.navButtons} name="Workouts" sx={{color: 'white'}}>Your Exercises</Button>
            <Button type="button" onClick={(e) => props.updateView(e)}  className={nav_classes.navButtons} name="Workouts-Search" sx={{color: 'white', whiteSpace: 'nowrap'}}>Find Exercises</Button>
            <Button type="button" onClick={(e) => props.updateView(e)}  className={nav_classes.navButtons} name="Nutrition" sx={{color: 'white'}}>Nutrition</Button>	
            <Button type="button" onClick={(e) => props.updateView(e)}  className={nav_classes.navButtons} name="Meal Plans" sx={{color: 'white'}}>Meal Plans</Button>	
          </Container>
          <Container sx={{justifyItems: "right"}}>
              <AccountMenu updateView={props.updateView}/>
          </Container>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;