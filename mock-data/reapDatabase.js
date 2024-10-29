import mongoose from 'mongoose';
import {User, db} from '../server/db/index.js'

db.on('open', () => {

  let deletedCount = 0;
  let failureCount = 0;


  //////////////////////////////////////////////////////////////////////////////////////////////
  /*                                 INITIALIZING USERS FOR SEED                              */

  const userOne = {
    username: 'Jeremy Hernandez',
  }

  const userTwo = {
    username: 'Benjamin Long',
  }

  const userThree = {
    username: 'Justin Sandrock',
  }

  const userFour = {
    username: 'Olivia Baylor',
  }

  const userFive = {
    username: 'Ethan Little',
  }
  //////////////////////////////////////////////////////////////////////////////////////////////



  //////////////////////////////////////////////////////////////////////////////////////////////
  /*                    PURGE DATABASE AND REPOPULATE WITH EXAMPLE USERS                      */
  /*  !!WARNING!!: Running npm seed command WILL delete users with matching usernames in db   */
  const deleteUserOne = User.deleteMany({username: userOne.username})
    .then( () => {
      deletedCount += 1
    })
    .catch( () => {
      failureCount += 1
    })

  const deleteUserTwo = User.deleteMany({username: userTwo.username})
    .then( () => {
      deletedCount += 1
    })
    .catch( () => {
      failureCount += 1
    })


  const deleteUserThree = User.deleteMany({username: userThree.username})
    .then( () => {
      deletedCount += 1
    })
    .catch( () => {
      failureCount += 1
    })

  const deleteUserFour = User.deleteMany({username: userFour.username})
    .then( () => {
      deletedCount += 1
    })
    .catch( () => {
      failureCount += 1
    })
    
  const deleteUserFive = User.deleteMany({username: userFive.username})
    .then( () => {
      deletedCount += 1
    })
    .catch( (error) => {
      failureCount += 1
    })  
  //////////////////////////////////////////////////////////////////////////////////////////////



  //////////////////////////////////////////////////////////////////////////////////////////////
  /*               WAITS FOR ALL OPERATIONS TO CONCLUDE, THEN LOGS MESSAGE                    */
  Promise.all([deleteUserOne, deleteUserTwo, deleteUserThree, deleteUserFour, deleteUserFive])
    .then(() => {
      console.log(
        `${deletedCount} successful deletions.`
      )
    })
  //////////////////////////////////////////////////////////////////////////////////////////////

  db.dropCollection('users');

})