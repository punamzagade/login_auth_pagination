import * as Yup from "yup";

export const signUpSchema = Yup.object({
  email: Yup.string().email("Please enter a valid email").required(),
  password: Yup.string().min(8,"Please enter your password").required(),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const signInSchema = Yup.object({
  email: Yup.string().email("Please enter a valid email").required(),
  password: Yup.string().min(8,"Password must be 8 character long.").required(),
});