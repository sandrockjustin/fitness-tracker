import mongoose from 'mongoose';
import {User, Routines, Meals, db} from '../server/db/index.js'
import exampleWorkouts from './exampleWorkouts.js'
import exampleNutrition from './exampleNutrition.js';

db.on('open', () => {

  //////////////////////////////////////////////////////////////////////////////////////////////
  /*                                 INITIALIZING USERS FOR SEED                              */

  function randomWorkouts(){
    if (
      exampleWorkouts === undefined ||
      exampleWorkouts.length === undefined || 
      exampleWorkouts.length === 0
    ) {
      return console.error('Error during database seed; exampleWorkouts undefined.')
    }
    let max = exampleWorkouts.length;
    let rand = Math.floor(Math.random() * max);
    return exampleWorkouts.slice(0, rand);
  }

  function randomNutrition(){
    if (
      exampleNutrition === undefined ||
      exampleNutrition.length === undefined || 
      exampleNutrition.length === 0
    ) {
      return console.error('Error during database seed; exampleNutrition undefined.')
    }
    let max = exampleNutrition.length;
    let rand = Math.floor(Math.random() * max);
    return exampleNutrition.slice(0, rand);
  }

  function randomRoutineName() {
    const routines = ['Chest Day', 'Leg Day', 'Arm Day', 'Upper Body', 'Abdominals']

    let max = routines.length;
    
    let rand = Math.floor(Math.random() * max);

    return routines[rand];
  }

  const userOne = {
    _id: 348528459102,
    workouts: randomWorkouts(),
    nutrition: randomNutrition(),
    username: 'fiddlesticks',
    phone_num: '111-111-1111',
    recov_email: 'fiddle_me_timbers@gmail.com'
  }

  const userTwo = {
    _id: 728573855104,
    workouts: randomWorkouts(),
    nutrition: randomNutrition(),
    username: 'snorlax86',
    phone_num: '222-222-2222',
    recov_email: 'snorlax86@gmail.com'
  }

  const userThree = {
    _id: 948401729542,
    workouts: randomWorkouts(),
    nutrition: randomNutrition(),
    username: 'lord_voltac',
    phone_num: '333-333-3333',
    recov_email: 'v0ltac@gmail.com'
  }

  const userFour = {
    _id: 648589359102,
    workouts: randomWorkouts(),
    nutrition: randomNutrition(),
    username: 'my_baby_just_peed_all_over_the_floor',
    phone_num: '444-444-4444',
    recov_email: 'ohnobabyLuke@gmail.com'
  }

  const userFive = {
    _id: 118274869102,
    workouts: randomWorkouts(),
    nutrition: randomNutrition(),
    username: 'Tad_Williams',
    phone_num: '555-555-5555',
    recov_email: 'georgeRRMartin_Come_on@gmail.com'
  }
  //////////////////////////////////////////////////////////////////////////////////////////////


  function initUser(user) {

    User.create(user)
      .then( (userCreated) => {
        return Routines.create({
          user_id: user._id,
          routine_name: randomRoutineName(),
          exercises: randomWorkouts()
        })
      })
      .then( (routineCreated1) => {
        return Routines.create({
          user_id: user._id,
          routine_name: randomRoutineName(),
          exercises: randomWorkouts()
        })
      })
      .then( (routineCreated2) => {
        return Routines.create({
          user_id: user._id,
          routine_name: randomRoutineName(),
          exercises: randomWorkouts()
        })
      })
      .then( (routineCreated3) => {
        return Meals.create({
          user_id: user._id,
          routine_name: randomRoutineName(),
          food_items: randomNutrition()
        })
      })
      .then( (mealCreated1) => {
        return Meals.create({
          user_id: user._id,
          routine_name: randomRoutineName(),
          food_items: randomNutrition()
        })
      })
      .then( (mealCreated2) => {
        return Meals.create({
          user_id: user._id,
          routine_name: randomRoutineName(),
          food_items: randomNutrition()
        })
      })
      .then( () => {
        console.log(`Database seed process has been completed for user #${user._id}.`)
      })
      .catch( (error) => {
        console.error(`Error on database seed for #${user._id}; have you purged the database before running this command?`)
      })

  }

  const allUsers = [userOne, userTwo, userThree, userFour, userFive];

  allUsers.forEach((user) => {
    initUser(user);
  })

})