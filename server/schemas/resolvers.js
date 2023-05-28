const qrcode = require('qrcode')
const { User, Person, Department, Role, Asset, SignEvent, Category } = require('../models')
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express')
const domain = 'http://localhost:3000'
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
      throw new AuthenticationError('You need to be logged in!')
    },
    allPeople: async (parent) => {
      const people = await Person.find()
        .populate('department')``
        .populate('role')
        .populate('assets')
        .sort({ lastname: 1 })
      return people
    },
    allDepartments: async (parent) => {
      const department = await Department.find()
        .populate({
          path: 'manager',
          populate: { path: 'role' }
        })
        .populate({
          path: 'people',
          populate: { path: 'role' }
        })
      return department
    },
    allAssets: async (parent) => {
      const assetList = await Asset.find()
        .populate('category')
        .populate({
          path: 'signInOut',
          populate: {
            path: 'person',
            model: 'Person'
          }
        })
      return assetList
    },
    singleAsset: async (parent, { _id }) => {
      const asset = await Asset.findOne({ _id })
      return asset
    },

    allSignEvents: async (parent) => {
      return SignEvent.find().populate('asset').populate('person')
    }
  },

  Mutation: {
    // Seed Database
    seedDatabase: async (parent, args) => {
      const seedRoles = await Role.create(args.roles)
      const seedCategories = await Category.create(args.categories)
      const seedDepartments = await Department.create(args.departments)
      const seedAssets = await Asset.create(args.assets)
      const seedPeople = await Person.create(args.people)
      const seedSignEvent = await SignEvent.create(args.signEvent)
      return { seedAssets, seedCategories, seedDepartments, seedRoles, seedPeople, seedSignEvent }
    },

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
    // TODO: update department with new people
    bulkCreatePeople: async (parent, args) => {
      console.log('doesnt update department')
      const people = await Person.create(args.people)
      return people
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
    addPeopleToDepartment: async (parent, args) => {
      const department = await Department.findOneAndUpdate(
        { _id: args.department },
        { $push: { people: { $each: args.people } } },
        { new: true }
      )
      return department
    },
    removePeopleFromDepartment: async (parent, args) => {
      const department = await Department.findOneAndUpdate(
        { _id: args.department },
        { $pull: { people: { $in: args.people } } },
        { new: true }
      )
      return department
    },

    // Role
    addRole: async (parent, args) => {
      const role = await Role.create(args)
      return role
    },
    // Assets
    addAsset: async (parent, args) => {
      const createAsset = await Asset.create(args)
      const qrcodeUrl = `${domain}/asset/${createAsset._id}`
      const qrcodeImage = await qrcode.toDataURL(qrcodeUrl)
      const asset = await Asset.findOneAndUpdate(
        { _id: createAsset._id },
        { $set: { qrcode: qrcodeImage } },
        { new: true }
      )
      return asset
    },
    addSignEvent: async (parent, args) => {
      //  sign out event, update asset, add asset to person
      const assetToUpdate = await Asset.findById(args.asset)
      if (!assetToUpdate.isSignedOut && args.person) {
        const createSignEvent = await SignEvent.create(args)
        await Asset.findOneAndUpdate(
          { _id: args.asset },
          { $push: { signInOut: createSignEvent._id }, $set: { isSignedOut: true } },
          { new: true }
        )
        await Person.findOneAndUpdate(
          { _id: args.person },
          { $push: { assets: args.asset } },
          { new: true }
        )
        const signEvent = await SignEvent.find({ _id: createSignEvent._id }).populate('asset').populate('person')
        return signEvent
        // signin asset, update asset with sign event, remove asset from person
      } else if (assetToUpdate.isSignedOut) {
        const createSignEvent = await SignEvent.create(args)
        await Asset.findOneAndUpdate(
          { _id: args.asset },
          { $push: { signInOut: createSignEvent._id }, $set: { isSignedOut: false } },
          { new: true }
        )
        await Person.findOneAndUpdate(
          { _id: args.person },
          { $pull: { assets: args.asset } },
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
