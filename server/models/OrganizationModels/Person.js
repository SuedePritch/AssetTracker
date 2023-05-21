const { Schema, model } = require('mongoose')

const personSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      unique: true
    },
    lastname: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    phone: {
      type: Number,
      required: true,
      unique: true
    },

    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: false
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: false
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: false
    }
  }
)

const Person = model('Person', personSchema)

module.exports = Person