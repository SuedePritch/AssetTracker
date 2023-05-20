const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
    _id: ID
    username: String
    email: String
    password: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Asset {
        _id: ID
        name: String
        description: String
        category: [Category]
        signedIn: [SignedIn]
        signedOut: [SignedOut]
        isSignedOut: Boolean
    }
    type Category {
        _id: ID
        name: String
        description: String
    }
    type SignedIn {
        date: String
        user: User
        comments: String
    }
    type SignedOut {
        date: String
        user: User
        comments: String
    }










type Query{
    user: User
    allAssets: [Asset]
}
type Mutation {
    # USER
    addUser(username: String!, email: String! password: String!): Auth
    login(email: String!, password: String!): Auth
    #Assets
    addAsset(name: String!, description: String!, category: [ID]): Asset
    # Category
    addCategory(name: String!, description: String!): Category
}
`

module.exports = typeDefs
