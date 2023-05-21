const { Schema, model } = require('mongoose')

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
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

const Category = model('Category', categorySchema)

module.exports = Category
