import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            username
            password
            email
        }
    }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`
export const ADD_ASSET = gql`
    mutation addAsset($name: String!, $description: String!, $category: [ID]) {
        addAsset(name: $name, description: $description, category: $category) {
    _id
    name
  }
    }
`
