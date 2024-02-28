import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //registration_date: {type: Date, required: true},
  // profile_photo: {
  //   title: {type: String},
  //   privacy: {type: String, required: true},
  //   image_path: {type: String, required: true},
  // },
  location: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname:{type: String, required: true},
  gender: {type: String, required: true},
  birth_date: {type: Date},
  role: {type: String,  enum : ['Client','Service Provider'], default: 'Client'},
  is_blocked: {type: String, enum : ['Blocked','Unblocked'], default: 'Unblocked'},
  is_loggedIn: {type: Boolean, required:true, default: false},
});


// Save the password in encrypted form (25/2/24)
userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10)
  next()
})

// functio to check if the password is corret or not  (25/2/24)
userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password,this.password)
}

//function to generate access token (25/2/24)
userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      firstname: this.firstname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}
const User = mongoose.model('user', userSchema);

export default User;
