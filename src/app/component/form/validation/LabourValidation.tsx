import * as Yup from "yup"; 

export const LabourValidationSchema = Yup.object().shape({
    approved: Yup.string()
      .required("Approval status is required")
      .oneOf(["Yes", "No"], "Approved must be 'Yes' or 'No'"),
    voc: Yup.string().required("VOC details are required"),
    detailJob: Yup.string().required("Job details are required"),
    fir: Yup.string()
      .required("FIR status is required")
      .oneOf(["Yes", "No"], "FIR must be 'Yes' or 'No'"),
    remarks: Yup.string(),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive")
      .integer("Amount must be an integer"),
  });