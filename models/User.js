// User model and schema definition

const { Schema, model } = require('mongoose');
// const { Schema, Types, model } = require('mongoose');

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
  // Required is false and default is undefined so that null subdocuments are not created if omitted.
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
      required: false,
      default: undefined
    }
  ],
  // Required is false and default is undefined so that null subdocuments are not created if omitted.
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: undefined
    }
  ],
}, {
    timestamps: true,       // adds createdAt and updatedAt fields (that MongoDB manages for you)
});

const User = model('User', userSchema);

module.exports = User;