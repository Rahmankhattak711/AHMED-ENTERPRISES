import * as Yup from "yup";

export const CustomerOwnerValidationSchema = Yup.object().shape({
  userName: Yup.string()
    .required("User's name is required"),
  // userMobile: Yup.string()
  //   .required("User's mobile number is required")
  //   .matches(/^[0-9]+$/, "Mobile number must be digits only")
  //   .min(10, "Mobile number must be at least 10 digits")
  //   .max(15, "Mobile number must be at most 15 digits"),
  // userEmail: Yup.string()
  //   .email("Invalid email format")
  //   .required("User's email is required"),
  // address: Yup.string()
  //   .required("Address is required"),
});
