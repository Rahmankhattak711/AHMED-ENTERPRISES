import * as Yup from "yup"; 

export const SubletValidationSchema = Yup.object().shape({
    finalPrice: Yup.number()
      .required("Final Price is required")
      .positive("Final Price must be a positive number"),
  });