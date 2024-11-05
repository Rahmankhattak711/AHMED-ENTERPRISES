import { Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup"; 
import Button from "../Button";
import InputField from "./InputFailed";

interface FormValues {
  approved: string;
  voc: string;
  estPrice: string;
  fir: string;
  remarks: string;
  finalPrice: string;
}


const validationSchema = Yup.object().shape({
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

export default function SubletServiceForm({
  onRowAdd,
}: {
  onRowAdd: (row: any, label: string) => void;
}) {
  const initialValues: FormValues = {
    approved: "",
    voc: "",
    remarks: "",
    fir: "",
    estPrice: "",
    finalPrice: "",
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
          onRowAdd(values, "subletService");
          resetForm();
          console.log("Form data:", values);
        }}
      >
        {() => (
          <Form className="w-full flex flex-col items-center mb-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InputField label="Approved" name="approved" placeholder="Yes/No" />
              <InputField label="VOC" name="voc" placeholder="VOC details" />
              <InputField label="Remarks" name="remarks" placeholder="Any remarks" />
              <InputField label="Fir" name="fir" placeholder="Yes/No" />
              <InputField label="Est Price" name="estPrice" type="number" placeholder="Estimated Price" />
              <InputField label="Final Price" name="finalPrice" type="number" placeholder="Final Price" />
            </div>
            <Button type="submit" text="Add Row" className="mt-4" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
