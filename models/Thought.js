const {Schema, model, Types} = require('mongoose')
const dateFormat = require('../utils/dateFormat')

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Please enter a thought',
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [

    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
)

ThoughtSchema.virtual('reactionsCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought