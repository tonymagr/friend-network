const { Schema, model } = require('mongoose');
// const { Schema, Types, model } = require('mongoose');
// const mongoose = require('../config/connection');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Not a valid email address.']
  },
  thoughts: {
    type: Schema.ObjectId,
    ref: 'Thought'
  },
  friends: {
    type: Schema.ObjectId,
    ref: 'User'
  },
}, {
    timestamps: true,       // adds createdAt and updatedAt fields (that MongoDB manages for you)
});

const User = model('User', userSchema);

module.exports = User;