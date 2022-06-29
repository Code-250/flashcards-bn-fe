import { gql } from "@apollo/client";

export const GET_ALL_FLASHCARDS = gql`
  query Query($orderBy: [CardOrderByInput!]) {
    allFlashcards(orderBy: $orderBy) {
      id
      question
      answer
      details
      isDone
      cardOwner {
        name
        email
      }
    }
  }
`;

export const CREATE_FLASHCARD = gql`
  mutation Mutation($question: String!, $answer: String!, $details: String!) {
    post(question: $question, answer: $answer, details: $details) {
      id
      question
      answer
      details
    }
  }
`;


export const UPDATE_FLASHCARDS = gql`
  mutation Mutation(
    $updateFlashcardId: Int!
    $question: String
    $answer: String
    $details: String
  ) {
    updateFlashcard(
      id: $updateFlashcardId
      question: $question
      answer: $answer
      details: $details
    ) {
      id
      question
      answer
      details
      cardOwner {
        name
        email
      }
    }
  }
`;

export const DELETE_FLASHCARDS = gql`
  mutation DeleteFlashcard($deleteFlashcardId: Int!) {
    deleteFlashcard(id: $deleteFlashcardId) {
      id
    }
  }
`;