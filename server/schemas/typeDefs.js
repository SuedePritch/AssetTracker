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
    type Person {
        _id: ID
        firstname: String
        lastname: String
        email: String
        phone: String
        department: Department
        role: Role
    }
    type Department {
        _id: ID
        name: String
        people: [Person]
    }
    type Role {
        _id: ID
        name: String
    }

    type Asset {
        _id: ID
        name: String
        description: String
        category: [Category]
        signInOut: [SignEvent]
        isSignedOut: Boolean
    }
    type Category {
        _id: ID
        name: String
        description: String
    }
    type SignEvent {
        _id: ID
        asset: Asset
        date: String
        person: Person
        comments: String
    }




type Query{
    user: User
    allPeople: [Person]
    allDepartments: [Department]
    allRoles: [Role]
    allAssets: [Asset]
    allSignEvents: [SignEvent]
}
type Mutation {
    # USER
    addUser(username: String!, email: String! password: String!): Auth
    login(email: String!, password: String!): Auth
    #Person
    addPerson(firstname: String!, lastname: String!, email: String!, phone: String!, department: ID, role: ID!): Person
    #Department
    addDepartment(name: String!, people:[ID]): Department
    addRole(name: String!): Role
    #Assets
    addAsset(name: String!, description: String!, category: [ID]): Asset
    addSignEvent(asset: ID!, person: ID, comments: String): SignEvent
    # Category
    addCategory(name: String!, description: String!): Category
}
`

module.exports = typeDefs
