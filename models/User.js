const { Schema, model} = require('mongoose')
const validateEmail =require('../utils/validateEmail')

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'username is required',
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: 'email is required',
      validate: [validateEmail, 'Please enter a valid email' ],
      match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'Please enter a valid email' ]
    },
    thoughts: [
      {

      }
    ],
    friends: [
      {

      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
)

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

const User = model('User', UserSchema)

module.exports = User