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
        assets: [Asset]
    }
    input PersonInput {
        _id: ID
        firstname: String
        lastname: String
        email: String
        phone: String
        department: ID
        role: ID
        assets: [ID]
    }
    type Department {
        _id: ID
        name: String
        manager: Person
        people: [Person]
    }
    input DepartmentInput {
        _id: ID
        name: String
        manager: ID
        people: [ID]
    }
    type Role {
        _id: ID
        name: String
    }
    input RoleInput {
        _id: ID
        name: String!
    }

    type Asset {
        _id: ID
        name: String
        description: String
        category: [Category]
        signInOut: [SignEvent]
        isSignedOut: Boolean
        qrcode: String
    }
    input AssetInput {
        _id: ID
        name: String
        description: String
        category: [ID]
        signInOut: [ID]
        isSignedOut: Boolean
    }

    type Category {
        _id: ID
        name: String
        description: String
    }
    input CategoryInput {
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
    input SignEventInput {
        _id: ID
        asset: ID
        date: String
        person: ID
        comments: String
    }





type Query{
    user: User
    allPeople: [Person]
    allDepartments: [Department]
    allRoles: [Role]
    allAssets: [Asset]
    singleAsset(_id:ID!): Asset
    allSignEvents: [SignEvent]
}
type Mutation {
    bulkCreatePeople(people: [PersonInput]): [Person]
    seedDatabase(assets: [AssetInput], categories: [CategoryInput], departments: [DepartmentInput], roles: [RoleInput], people: [PersonInput], signEvent:[SignEventInput]): Person
    # USER
    addUser(username: String!, email: String! password: String!): Auth
    login(email: String!, password: String!): Auth
    #Person
    addPerson(firstname: String!, lastname: String!, email: String!, phone: String!, department: ID, role: ID!): Person
    #Department
    addDepartment(name: String!, people:[ID]): Department
    addPeopleToDepartment(department: ID!, people: [ID]): Department
    removePeopleFromDepartment(department: ID!, people: [ID]): Department
    #Role
    addRole(name: String!): Role
    #Assets
    addAsset(name: String!, description: String!, category: [ID], qrcode: String): Asset
    addSignEvent(asset: ID!, person: ID, comments: String): SignEvent
    # Category
    addCategory(name: String!, description: String!): Category
}
`

module.exports = typeDefs
