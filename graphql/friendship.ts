import { gql } from "@apollo/client";

const FRIENDSHIP_FIELDS = `
  id
  status
  iAmRequester
  createdAt
  friend {
    id
    username
    image
    friendStatus
  }
`;

export const MY_FRIENDS = gql`
  query MyFriends {
    myFriends {
      status
      error
      message
      success
      data {
        ${FRIENDSHIP_FIELDS}
      }
    }
  }
`;

export const PENDING_REQUESTS = gql`
  query PendingRequests {
    pendingRequests {
      status
      error
      message
      success
      data {
        ${FRIENDSHIP_FIELDS}
      }
    }
  }
`;

export const EXPLORE_USERS = gql`
  query ExploreUsers($username: String, $page: Int, $size: Int) {
    exploreUsers(username: $username, page: $page, size: $size) {
      status
      error
      message
      success
      data {
        result {
          id
          username
          image
          friendStatus
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

export const FRIEND_FAVORITES = gql`
  query FriendFavorites($friendId: ID!, $page: Int, $size: Int) {
    friendFavorites(friendId: $friendId, page: $page, size: $size) {
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
            sourceName
            category {
              id
              name
              mediaTypeHint
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

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($addresseeId: ID!) {
    sendFriendRequest(addresseeId: $addresseeId) {
      status
      error
      message
      success
      data {
        ${FRIENDSHIP_FIELDS}
      }
    }
  }
`;

export const RESPOND_FRIEND_REQUEST = gql`
  mutation RespondFriendRequest($friendshipId: ID!, $accept: Boolean!) {
    respondFriendRequest(friendshipId: $friendshipId, accept: $accept) {
      status
      error
      message
      success
      data {
        ${FRIENDSHIP_FIELDS}
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($friendshipId: ID!) {
    removeFriend(friendshipId: $friendshipId) {
      status
      error
      message
      success
    }
  }
`;
