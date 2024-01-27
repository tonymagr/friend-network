const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
    timestamps: true,       // adds createdAt and updatedAt fields (that MongoDB manages for you)
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;