import gql from 'graphql-tag'

export const getLinks = gql`
  query getLinks {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

export const createLink = gql`
  mutation createLink($description: String!, $url: String!) {
    createLink(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

export const signup = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

export const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`
