import { gql } from "@apollo/client";

const GET_ALL_FLASHCARDS = gql`
  query Query{
    allFlashCards:{
      id
      question
      answer
      details
      isDone
      cardOwner{
        name
        email
      }
    }
  }
`;
export default GET_ALL_FLASHCARDS;
