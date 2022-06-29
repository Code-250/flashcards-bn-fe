import * as yup from "yup";

const regx = /^(?=.*[A-Z])(?=.*[0-9])\w{8,}$/;
export const loginSchema = yup.object({
  email: yup
    .string()
    .email("please enter a valid email")
    .required("email is requied"),
  password: yup.string().required("password field is required"),
});

export const signupSchema = yup.object({
  name: yup.string().required("name is required"),
  email: yup
    .string()
    .email("a valid email is required")
    .required("email is required"),
  password: yup.string().required("password field is required"),
});
