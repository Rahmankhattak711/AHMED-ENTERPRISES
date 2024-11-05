import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup"; 
import Button from "../Button";
import InputField from "./InputFailed";

interface FormValues {
  approved: string;
  voc: string;
  detailJob: string;
  fir: string;
  remarks: string;
  amount: string;
}


const validationSchema = Yup.object().shape({
  approved: Yup.string()
    .required("Approval status is required")
    .oneOf(["Yes", "No"], "Approved must be 'Yes' or 'No'"),
  voc: Yup.string()
    .required("VOC details are required"),
  detailJob: Yup.string()
    .required("Job details are required"),
  fir: Yup.string()
    .required("FIR status is required")
    .oneOf(["Yes", "No"], "FIR must be 'Yes' or 'No'"),
  remarks: Yup.string(),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .integer("Amount must be an integer"),
});

export default function LabourServiceForm({
  onRowAdd,
}: {
  onRowAdd: (row: any, label: string) => void;
}) {
  const initialValues: FormValues = {
    approved: "",
    voc: "",
    detailJob: "",
    fir: "",
    remarks: "",
    amount: "",
  };

  const handleSaveToLocalStorage = (newData: FormValues) => {
    const existingData = JSON.parse(localStorage.getItem("tableData") || "[]");
    const updatedData = [...existingData, newData];
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  return (
    <div className="w-full px-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema} 
        onSubmit={(values, { resetForm }) => {
          handleSaveToLocalStorage(values);
          onRowAdd(values, "labourService");
          resetForm();
          console.log("Form data:", values);
        }}
      >
        {() => (
          <Form className="w-full flex flex-col items-center mb-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InputField label="Approved" name="approved" placeholder="Yes/No" />
              <InputField label="VOC" name="voc" placeholder="VOC details" />
              <InputField label="Detail Job" name="detailJob" placeholder="Job details" />
              <InputField label="Fir" name="fir" placeholder="Yes/No" />
              <InputField label="Remarks" name="remarks" placeholder="Any remarks" />
              <InputField label="Amount" name="amount" type="number" placeholder="Amount" />
            </div>
            <Button type="submit" text="Add Row" className="mt-4" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
