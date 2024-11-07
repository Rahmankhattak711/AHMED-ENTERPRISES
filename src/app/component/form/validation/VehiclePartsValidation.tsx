import * as Yup from "yup";

export const VehiclePartsValidation = Yup.object().shape({
  unitPrice: Yup.string().required("Unit Price is required"),
  qty: Yup.string().required("Quantity is required"),
  partAmount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .integer("Amount must be an integer"),
});
