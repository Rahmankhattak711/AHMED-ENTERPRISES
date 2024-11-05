import * as Yup from "yup"; 

export const SubletValidationSchema = Yup.object().shape({
    approved: Yup.string()
      .oneOf(["Yes", "No"], "Must be either 'Yes' or 'No'")
      .required("Approved is required"),
    voc: Yup.string().required("VOC is required"),
    remarks: Yup.string().optional(),
    fir: Yup.string()
      .oneOf(["Yes", "No"], "Must be either 'Yes' or 'No'")
      .required("FIR is required"),
    estPrice: Yup.number()
      .required("Estimated Price is required")
      .positive("Estimated Price must be a positive number"),
    finalPrice: Yup.number()
      .required("Final Price is required")
      .positive("Final Price must be a positive number"),
  });