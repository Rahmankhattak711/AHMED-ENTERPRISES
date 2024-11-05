import { Formik, Form } from "formik";
import React from "react";
import Button from "../Button";
import { CustomerOwnerValidationSchema } from "./validation/CustomerOwnerValidation";
import InputField from "./InputFailed";

interface FormValues {
  userName: string;
  userMobile: string;
  userEmail: string;
  address: string;
}

export default function CustomerOwnerForm({
  onRowAdd,
}: {
  onRowAdd: (row: FormValues, label: string) => void;  
}) {
  const initialValues: FormValues = {
    userName: "",
    userMobile: "",
    userEmail: "",
    address: "", 
  };

  const handleSaveToLocalStorage = (newData: FormValues) => {
    const existingData = JSON.parse(localStorage.getItem("CustomerOwnerData") || "[]");
    const updatedData = [...existingData, newData];
    localStorage.setItem("CustomerOwnerData", JSON.stringify(updatedData));
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={CustomerOwnerValidationSchema} 
        onSubmit={(values, { resetForm }) => {
          handleSaveToLocalStorage(values);
          onRowAdd(values, "customerOwner");
          resetForm();
        }}
      >
        {() => (
          <Form className="flex flex-col items-center w-full space-y-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="User's Name" name="userName" placeholder="Enter your name" />
              <InputField label="User's Mobile" name="userMobile" placeholder="Enter your mobile number" />
              <InputField label="User's Email" name="userEmail" placeholder="Enter your email address" />
              <InputField label="Address" name="address" placeholder="Enter your address" /> {/* Address field */}
            </div>
            <Button type="submit" text="Add Customer/Owner Info" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
