import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import Button from "../Button";
import InputField from "./InputFailed";

interface FormValues {
  make: string;
  variant: string;
  regNo: string;
  mileage: string;
  chassisNo: string;
  engineNo: string;
  color: string;
}

const validationSchema = Yup.object().shape({
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

export default function CustomerVehicleForm({
  onRowAdd,
}: {
  onRowAdd: (row: any, label: string) => void;
}) {
  const initialValues: FormValues = {
    make: "",
    variant: "",
    regNo: "",
    mileage: "",
    chassisNo: "",
    engineNo: "",
    color: "",
  };

  const handleSaveToLocalStorage = (newData: FormValues) => {
    const existingData = JSON.parse(localStorage.getItem("VehicleCustomerData") || "[]");
    const updatedData = [...existingData, newData];
    localStorage.setItem("VehicleCustomerData", JSON.stringify(updatedData));
  };

  return (
    <div className="w-full px-4 py-6 bg-white shadow-md rounded-lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema} 
        onSubmit={(values, { resetForm }) => {
          handleSaveToLocalStorage(values);
          onRowAdd(values, "vehicleCustomer");
          resetForm();
          console.log("Form data:", values);
        }}
      >
        {() => (
          <Form className="flex flex-col items-center w-full space-y-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField label="Make" name="make" placeholder="Make" />
              <InputField label="Variant" name="variant" placeholder="Variant" />
              <InputField label="Reg No" name="regNo" placeholder="Reg No" />
              <InputField label="Mileage" name="mileage" placeholder="Mileage" />
              <InputField label="Chassis No" name="chassisNo" placeholder="Chassis No" />
              <InputField label="Engine No" name="engineNo" placeholder="Engine No" />
              <InputField label="Color" name="color" placeholder="Color" />
            </div>
            <Button type="submit" text="Add Customer Vehicle Info" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
