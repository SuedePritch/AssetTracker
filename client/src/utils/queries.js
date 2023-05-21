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
    isSignedOut
    name
    signInOut {
      date
      comments
      _id
      user {
        username
      }
    }
  }
}
`;