import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // registration_date: {type: Date, required: true},
  // profile_photo: {
  //   title: {type: String},
  //   privacy: {type: String, required: true},
  //   image_path: {type: String, required: true},
  // },
  location: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname:{type: String, required: true},
  gender: {type: String, required: true},
  // birth_date: {type: Date, required: true},
});

const User = mongoose.model('user', userSchema);

export default User;
