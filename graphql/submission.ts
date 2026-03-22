import { gql } from "@apollo/client";

export const MY_SUBMISSIONS = gql`
  query MySubmissions($page: Int, $size: Int) {
    mySubmissions(page: $page, size: $size) {
      status
      error
      message
      success
      data {
        result {
          id
          userId
          name
          color
          category {
            id
            name
            mediaTypeHint
          }
          sourceName
          notes
          status
          createdAt
          reviewedAt
          rejectionReason
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

export const PENDING_SUBMISSIONS = gql`
  query PendingSubmissions($page: Int, $size: Int) {
    pendingSubmissions(page: $page, size: $size) {
      status
      error
      message
      success
      data {
        result {
          id
          userId
          name
          color
          category {
            id
            name
            mediaTypeHint
          }
          sourceName
          notes
          status
          createdAt
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

export const SUBMIT_CAT = gql`
  mutation SubmitCat($submission: CatSubmissionRequest!) {
    submitCat(submission: $submission) {
      status
      error
      message
      success
      data {
        id
        name
        status
        createdAt
      }
    }
  }
`;

export const APPROVE_SUBMISSION = gql`
  mutation ApproveSubmission($id: ID!) {
    approveSubmission(id: $id) {
      status
      error
      message
      success
      data {
        id
        status
        reviewedAt
      }
    }
  }
`;

export const REJECT_SUBMISSION = gql`
  mutation RejectSubmission($id: ID!, $reason: String) {
    rejectSubmission(id: $id, reason: $reason) {
      status
      error
      message
      success
      data {
        id
        status
        rejectionReason
        reviewedAt
      }
    }
  }
`;
