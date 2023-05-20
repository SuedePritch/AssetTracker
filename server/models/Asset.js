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
    signedIn: [
      {
        date: {
          type: Date,
          required: true,
          default: ((Date.now()) + 86400000 * 1)
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        comments: {
          type: String
        }
      }
    ],
    signedOut: [
      {
        date: {
          type: Date,
          required: true,
          default: ((Date.now()) + 86400000 * 1)
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        comments: {
          type: String
        }
      }
    ],
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
