import { gql } from '@apollo/client';

export const GET_ME = gql`
query user {
user {
    username
    email
    }
}
`;
export const All_ASSETS = gql`
query allAssets {
  allAssets {
    _id
    name
    description
    category {
      description
      name
    }
    signInOut {
      _id
      date
      person {
        firstname
        lastname
      }
    }
    isSignedOut
  }
}
`;