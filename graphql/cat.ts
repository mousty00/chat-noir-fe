import { gql } from "@apollo/client";

export const GET_CATS = gql`
  query GetCats($page: Int!, $size: Int!, $category: String, $name: String) {
    cats(page: $page, size: $size, category: $category, name: $name) {
      status
      error
      message
      success
      data {
        result {
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

export const GET_CAT_CATEGORIES = gql`
  query categories {
    categories {
      status
      error
      message
      success
      data {
        id
        name
        mediaTypeHint
      }
    }
  }
`;

export const GET_CAT_MEDIA_DOWNLOAD_INFO = gql`
  query GetCatMediaDownloadInfo($id: ID!) {
    catMediaDownloadInfo(id: $id) {
      status
      error
      message
      success
      data {
        streamUrl
        filename
        contentType
        contentLength
        extension
        viewable
      }
    }
  }
`;
