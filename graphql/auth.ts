import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($request: LoginRequest!) {
    login(request: $request) {
      status
      error
      message
      success
      data {
        token
        id
        username
        email
        isAdmin
        roles
        image
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($request: RegisterRequest!) {
    register(request: $request) {
      status
      error
      message
      success
      data
    }
  }
`;
