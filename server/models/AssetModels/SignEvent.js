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
    person: {
      type: Schema.Types.ObjectId,
      ref: 'Person'
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
