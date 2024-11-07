import * as Yup from "yup"; 

export const LabourValidationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .integer("Amount must be an integer"),
  });