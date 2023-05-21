const { Schema, model } = require('mongoose')

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: false
    }
  }
)

const Role = model('Role', roleSchema)

module.exports = Role
