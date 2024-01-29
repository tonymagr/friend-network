// Thought model and schema definition
const { Schema, model } = require('mongoose');

// Reaction schema is defined first for use in Thought schema and model
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
}, {
    timestamps: true,
    virtuals: {
      createdAtLocal: {
        get() { return this.createdAt.toLocaleString('en-US') }
      }
    },
  }
);
// The combination of the date formatting virtual above and setting this toJSON getters flag to true
// allow formatting createdAt date. 
reactionSchema
    .set('toJSON', { getters: true });

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ reactionSchema ],
  reaction: reactionSchema,
}, {
    timestamps: true,
    virtuals: {
      createdAtLocal: {
        get() { return this.createdAt.toLocaleString('en-US') }
      }
    },
  }
);
// The combination of the date formatting virtual above and setting this toJSON getters flag to true
// allow formatting createdAt date. 
thoughtSchema
    .set('toJSON', { getters: true });

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;