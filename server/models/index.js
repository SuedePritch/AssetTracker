const User = require('./User')
const Asset = require('./AssetModels/Asset')
const Category = require('./AssetModels/Category')
const SignEvent = require('./AssetModels/SignEvent')
const Person = require('./OrganizationModels/Person')
const Department = require('./OrganizationModels/Department')
const Role = require('./OrganizationModels/Role')

module.exports = { User, Person, Department, Role, Asset, Category, SignEvent }
