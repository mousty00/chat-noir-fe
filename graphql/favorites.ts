import { gql } from "@apollo/client";

export const MY_FAVORITES = gql`
  query MyFavorites($page: Int, $size: Int) {
    myFavorites(page: $page, size: $size) {
      status
      error
      message
      success
      data {
        result {
          id
          cat {
            id
            name
            color
            image
            category {
              name
            }
          }
        }
        currentPage
        totalPages
        totalItems
        pageSize
        hasNext
        hasPrevious
      }
    }
  }
`;

export const IS_FAVORITE = gql`
  query IsFavorite($catId: ID!) {
    isFavorite(catId: $catId) {
      status
      error
      message
      success
      data
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation AddFavorite($catId: ID!) {
    addFavorite(catId: $catId) {
      status
      error
      message
      success
      data {
        id
        cat {
          id
          name
          color
          image
          category {
            name
          }
        }
      }
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($catId: ID!) {
    removeFavorite(catId: $catId) {
      status
      error
      message
      success
    }
  }
`;
