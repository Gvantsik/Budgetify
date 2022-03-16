const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => v.includes('@'),
        message: (prop) => `Email (${prop.value}) must be valid e-mail`,
      },
    },
    password: String,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    countryOfResidence: String,
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    edited: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
