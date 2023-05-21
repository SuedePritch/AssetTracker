const { User, Asset, SignEvent, Category } = require('../models')
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
    allAssets: async (parent) => {
      const assetList = await Asset.find()
        .populate('category')
        .populate({
          path: 'signInOut',
          populate: { path: 'user', model: 'User' }
        })
      return assetList
    },
    allSignEvents: async (parent) => {
      return SignEvent.find().populate('asset').populate('user')
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

    // Assets
    addAsset: async (parent, args) => {
      const asset = await Asset.create(args)
      return asset
    },
    addSignEvent: async (parent, args) => {
      const createSignEvent = await SignEvent.create(args)
      const assetToUpdate = await Asset.findById(args.asset)
      await Asset.findOneAndUpdate(
        { _id: args.asset },
        // update the asset with the new signEvent and set the isSignedOut to the opposite of what it was
        { $push: { signInOut: createSignEvent._id }, $set: { isSignedOut: !assetToUpdate.isSignedOut } },
        { new: true }
      )
      const signEvent = await SignEvent.find({ _id: createSignEvent._id }).populate('asset').populate('user')

      return signEvent
    },
    // Category
    addCategory: async (parent, args) => {
      const category = await Category.create(args)
      return category
    }
  }
}

module.exports = resolvers
