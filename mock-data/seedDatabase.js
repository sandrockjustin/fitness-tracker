import mongoose from 'mongoose';
import {User, db} from '../server/db/index.js'
import exampleWorkouts from './exampleWorkouts.js'

db.on('open', () => {

  let deletedCount = 0;
  let successCount = 0;
  let failureCount = 0;


  //////////////////////////////////////////////////////////////////////////////////////////////
  /*                                 INITIALIZING USERS FOR SEED                              */
  const userOne = {
    username: 'Fiddlesticks',
    workouts: exampleWorkouts,
    nutrition: ['Banana', 'Ham Sandwich', 'Chicken', 'Peach', 'Mango']
  }

  const userTwo = {
    username: 'Evelynn',
    workouts: exampleWorkouts,
    nutrition: ['Banana', 'Peach', 'Mango']
  }

  const userThree = {
    username: 'MooMoo Mittens',
    workouts: exampleWorkouts,
    nutrition: ['Chicken', 'Peach', 'Mango']
  }

  const userFour = {
    username: 'Louisa',
    workouts: exampleWorkouts,
    nutrition: ['Banana', 'Ham Sandwich', 'Mango']
  }

  const userFive = {
    username: 'Alphonso',
    workouts: exampleWorkouts,
    nutrition: ['Chicken', 'Peach']
  }
  //////////////////////////////////////////////////////////////////////////////////////////////



  //////////////////////////////////////////////////////////////////////////////////////////////
  /*                    PURGE DATABASE AND REPOPULATE WITH EXAMPLE USERS                      */
  /*  !!WARNING!!: Running npm seed command WILL delete users with matching usernames in db   */
  const createUserOne = User.findOneAndDelete({username: userOne.username})
    .then( () => {
      deletedCount += 1

      return User.create(userOne)
    })
    .then(() => {
      successCount += 1;
    })
    .catch( () => {
      failureCount += 1
    })

  const createUserTwo = User.findOneAndDelete({username: userTwo.username})
    .then( () => {
      deletedCount += 1

      return User.create(userOne)
    })
    .then( () => {
      successCount += 1
    })
    .catch( () => {
      failureCount += 1
    })


  const createUserThree = User.findOneAndDelete({username: userThree.username})
    .then( () => {
      deletedCount += 1

      return User.create(userOne)
    })
    .then( () => {
      successCount += 1
    })
    .catch( () => {
      failureCount += 1
    })

  const createUserFour = User.findOneAndDelete({username: userFour.username})
    .then( () => {
      deletedCount += 1

      return User.create(userOne)
    })
    .then( () => {
      successCount += 1
    })
    .catch( () => {
      failureCount += 1
    })
    
  const createUserFive = User.findOneAndDelete({username: userFive.username})
    .then( () => {
      deletedCount += 1

      return User.create(userOne)
    })
    .then( () => {
      successCount += 1
    })
    .catch( (error) => {
      console.error(error);
      failureCount += 1
    })  
  //////////////////////////////////////////////////////////////////////////////////////////////


  
  //////////////////////////////////////////////////////////////////////////////////////////////
  /*               WAITS FOR ALL OPERATIONS TO CONCLUDE, THEN LOGS MESSAGE                    */
  Promise.all([createUserOne, createUserTwo, createUserThree, createUserFour, createUserFive])
    .then(() => {
      console.log(`There were ${deletedCount} successful deletions and ${successCount} insertions.`)
      console.log(`There were ${failureCount} failures to during this process.`)
    })
  //////////////////////////////////////////////////////////////////////////////////////////////

})