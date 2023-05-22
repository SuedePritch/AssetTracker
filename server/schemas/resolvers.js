const { User, Person, Department, Role, Asset, SignEvent, Category } = require('../models')
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
  Query: {
    // USER
    // Single User
    user: async (parent, { _id }, context) => {
      if (context.user) {
        return User.findOne({
          _id: context.user._id
        })
      }
      throw new AuthenticationError('You need to be logged in! resolvers')
    },
    allPeople: async (parent) => {
      const people = await Person.find().populate('department').populate('role')
      return people
    },
    allDepartments: async (parent) => {
      const department = await Department.find().populate('people')
      return department
    },
    allAssets: async (parent) => {
      const assetList = await Asset.find()
        .populate('category')
        .populate({
          path: 'signInOut',
          populate: { path: 'person', model: 'Person' }
        })
      return assetList
    },
    allSignEvents: async (parent) => {
      return SignEvent.find().populate('asset').populate('person')
    }
  },

  Mutation: {
    // USER
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)

      return { token, user }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw new AuthenticationError('Incorrect credentials')
      }

      const correctPw = await user.isCorrectPassword(password)

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials')
      }

      const token = signToken(user)

      return { token, user }
    },
    // Person
    addPerson: async (parent, args) => {
      const person = await Person.create(args)
      if (args.department) {
        await Department.findOneAndUpdate(
          { _id: args.department },
          { $push: { people: person._id } },
          { new: true }
        )
        return person
      }
    },
    // Department
    addDepartment: async (parent, args) => {
      const department = await Department.create(args)
      if (args.people.length > 0) {
        await Person.updateMany(
          { _id: { $in: args.people } },
          { $set: { department: department._id } },
          { new: true }
        )
      }
      return department
    },
    addRole: async (parent, args) => {
      const role = await Role.create(args)
      return role
    },
    // Assets
    addAsset: async (parent, args) => {
      const asset = await Asset.create(args)
      return asset
    },
    addSignEvent: async (parent, args) => {
      const assetToUpdate = await Asset.findById(args.asset)
      if (!assetToUpdate.isSignedOut && args.person) {
        const createSignEvent = await SignEvent.create(args)
        await Asset.findOneAndUpdate(
          { _id: args.asset },
          { $push: { signInOut: createSignEvent._id }, $set: { isSignedOut: true } },
          { new: true }
        )
        const signEvent = await SignEvent.find({ _id: createSignEvent._id }).populate('asset').populate('person')
        return signEvent
      } else if (assetToUpdate.isSignedOut) {
        const createSignEvent = await SignEvent.create(args)
        await Asset.findOneAndUpdate(
          { _id: args.asset },
          { $push: { signInOut: createSignEvent._id }, $set: { isSignedOut: false } },
          { new: true }
        )
        const signEvent = await SignEvent.find({ _id: createSignEvent._id }).populate('asset').populate('person')
        return signEvent
      } else {
        throw new AuthenticationError('Person is required to sign out asset')
      }
    },
    // Category
    addCategory: async (parent, args) => {
      const category = await Category.create(args)
      return category
    }
  }
}

module.exports = resolvers
