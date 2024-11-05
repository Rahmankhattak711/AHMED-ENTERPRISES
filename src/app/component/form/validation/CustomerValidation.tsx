import * as Yup from "yup";

export const CustomerValidationSchema = Yup.object().shape({
    make: Yup.string().required("Make is required"),
    variant: Yup.string().required("Variant is required"),
    regNo: Yup.string().required("Registration number is required"),
    mileage: Yup.number()
      .required("Mileage is required")
      .positive("Mileage must be a positive number"),
    chassisNo: Yup.string().required("Chassis number is required"),
    engineNo: Yup.string().required("Engine number is required"),
    color: Yup.string().required("Color is required"),
  });