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
  nutrition: Array
})

UserSchema.plugin(findOrCreate);  // adding the findOrCreate plugin to our schema here

// make model from Schema
const User = mongoose.model('User', UserSchema);

const db = mongoose.connection;

// we still need to export this and the connection to mongoose
export {
  User,
  db
}