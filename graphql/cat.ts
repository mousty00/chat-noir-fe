import { gql } from "@apollo/client";

export const GET_CATS = gql`
  query GetCats($page: Int, $size: Int, $category: String, $color: String, $name: String, $source: String) {
    cats(page: $page, size: $size, category: $category, color: $color, name: $name, source: $source) {
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

export const GET_CAT_BY_ID = gql`
  query GetCatById($id: ID!) {
    catById(id: $id) {
      status
      error
      message
      success
      data {
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

export const CREATE_CAT = gql`
  mutation CreateCat($cat: CatRequest!) {
    createCat(cat: $cat) {
      status
      error
      message
      success
      data {
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
  }
`;

export const UPDATE_CAT = gql`
  mutation UpdateCat($id: ID!, $cat: CatRequest!) {
    updateCat(id: $id, cat: $cat) {
      status
      error
      message
      success
      data {
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
  }
`;

export const DELETE_CAT = gql`
  mutation DeleteCat($id: ID!) {
    deleteCat(id: $id) {
      status
      error
      message
      success
      data {
        id
      }
    }
  }
`;

export const DELETE_CAT_MEDIA = gql`
  mutation DeleteCatMedia($id: ID!) {
    deleteCatMedia(id: $id) {
      status
      error
      message
      success
      data
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($category: CreateCategoryRequest!) {
    createCategory(category: $category) {
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

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $category: CreateCategoryRequest!) {
    updateCategory(id: $id, category: $category) {
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

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
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
