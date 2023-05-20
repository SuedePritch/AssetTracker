const { Schema, model } = require('mongoose')

const assetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    category: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    //   required: true
    }],
    signInOut: [{
      type: Schema.Types.ObjectId,
      ref: 'SignEvent'
    }],
    isSignedOut: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: false
    }
  }
)

const Asset = model('Asset', assetSchema)

module.exports = Asset
