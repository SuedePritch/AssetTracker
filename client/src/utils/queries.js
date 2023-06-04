import { gql } from '@apollo/client';

export const GET_ME = gql`
query user {
user {
    username
    email
    }
}
`;
export const ALL_ASSETS = gql`
query allAssets {
  allAssets {
    signInOut {
      person {
        firstname
        lastname
      }
      date
      _id
    }
    _id
    category {
      name
    }
    isSignedOut
    name
    qrcode
  }
}
`;
export const SINGLE_ASSET = gql`
query singleAsset($id:ID!) {
  singleAsset(_id:$id) {
    _id
    name
    description
    isSignedOut
    qrcode
}
}
`;

export const ALL_CATEGORIES = gql`
query allCategories {
  allCategories {
    _id
    name
    description
  }
}
`;


export const ALL_PEOPLE = gql`
query allPeople {
  allPeople {
    _id
    firstname
    lastname
    email
    phone
    department {
      _id
      name
    }
    role {
      _id
      name
    }
    assets {
      _id
      name
      description
  }
  }
}
`;

export const ALL_DEPARTMENTS= gql`
query allDepartments {
  allDepartments {
    _id
    name
    manager {
      firstname
      lastname
      role{
        name
      }
    }
    people {
      _id
      firstname
      lastname
      role {
        name
    }
    }
  }
}`