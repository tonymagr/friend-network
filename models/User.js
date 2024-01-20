const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    firstName: {
      type: String,
      required: true,
      maxlength: 40,
    lastName: {
      type: String,
      required: true,
      maxlength: 50,
    },
  },
  // {
  //   // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
  //   // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
  //   toJSON: {
  //     virtuals: true,
  //   },
  //   id: false,
  // }
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
