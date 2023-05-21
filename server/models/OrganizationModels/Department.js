const { Schema, model } = require('mongoose')

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: 'Person'
    },
    people: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Person'
      }
    ]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: false
    }
  }
)

const Department = model('Department', departmentSchema)

module.exports = Department
