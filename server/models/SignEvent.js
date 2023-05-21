const { Schema, model } = require('mongoose')

const signEventSchema = new Schema(
  {
    asset: {
      type: Schema.Types.ObjectId,
      ref: 'Asset',
      required: true
    },
    date: {
      type: String,
      required: true,
      default: (Date.now())
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comments: {
      type: String
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: false
    }
  }
)

const SignEvent = model('SignEvent', signEventSchema)

module.exports = SignEvent
