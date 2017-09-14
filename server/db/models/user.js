/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  tokens: Array,

  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  birthDate: { type: Date, default: Date.now },
  age: { type: Number, min: 0, max: 120 },
  city: { type: String, default: '' },
  country: { type: String, default: '' },
  state: { type: String, default: '' },
  gender: { type: String, default: '' },
  website: { type: String, default: '' },
	avatarsSrc: [{
		avatarId: String,
		thumbnail1: String,
		mainProfil: String
	}],
	avatarMainSelected: { type: String, default: '0' },

  resetPasswordToken: String,
  resetPasswordExpires: Date,
  google: {}
});

function encryptPassword(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  return bcrypt.genSalt(5, (saltErr, salt) => {
    if (saltErr) return next(saltErr);
    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) return next(hashErr);
      user.password = hash;
      return next();
    });
  });
}

/**
 * Password hash middleware.
 */
UserSchema.pre('save', encryptPassword);

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
  }
};

/**
 * Statics
 */

UserSchema.statics = {};

export default mongoose.model('User', UserSchema);
