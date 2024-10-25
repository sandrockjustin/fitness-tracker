import mongoose from 'mongoose';
const { Schema } = mongoose;

// establish connection to mongoose
// before we can do this, we need to declare a database name and a path
const db = mongoose.connect('mongodb://127.0.0.1:27017/fitness-tracker')

//define schema
const UserSchema = new Schema({
  _id: Number, 
  username: String,
  workouts: Array,
  nutrition: Array
})

// make model from Schema
const User = mongoose.model('User', UserSchema);

// we still need to export this and the connection to mongoose
module.exports = {
  db,
  User
}