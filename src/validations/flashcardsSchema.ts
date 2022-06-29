import * as yup from "yup";

export const flashcardsSchema = yup.object({
  question: yup.string().required("question field is required"),
  answer: yup.string().required("the answer is required"),
  details: yup.string().required("details field is required"),
});
