import mongoose from 'mongoose';
const { Schema } = mongoose;
import findOrCreate from 'mongoose-findorcreate' // importing this to register it to our schema

// establish connection to mongoose
// before we can do this, we need to declare a database name and a path
mongoose.connect('mongodb://127.0.0.1:27017/fitness-tracker')
  .then(() => {
    console.log('>> Attempting to connect to database fitness-tracker <<')
  })
  .catch(() => {
    console.log('>> Error on connection to database fitness-tracker <<')
  })

//define schema
const UserSchema = new Schema({
  _id: String,
  workouts: Array,
  nutrition: Array,
  username: { type: String, required: false },
  phone_num: { type: String, required: false },
  recov_email: { type: String, required: false }
})

const RoutineSchema = new Schema({
	user_id: String,
	routine_name: String,
	exercises: Array
})

const MealSchema = new Schema({
  user_id: String,
  routine_name: {type: String, required: false},
  food_items: Array
})

UserSchema.plugin(findOrCreate);  // adding the findOrCreate plugin to our schema here

// make model from Schema
const User = mongoose.model('User', UserSchema);
const Routines = mongoose.model('Routines', RoutineSchema);
const Meals = mongoose.model('Meals', MealSchema)

const db = mongoose.connection;

// we still need to export this and the connection to mongoose
export {
  User,
  Routines,
  Meals,
  db
}