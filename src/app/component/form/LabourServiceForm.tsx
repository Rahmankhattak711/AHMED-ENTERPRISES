import { Formik, Form } from "formik";
import React from "react";
import Button from "../Button";
import { LabourValidationSchema } from "./validation/LabourValidation";
import InputField from "./InputFailed";

export interface FormValues {
  approved: string;
  voc: string;
  detailJob: string;
  fir: string;
  remarks: string;
  amount: string;
}

export default function LabourServiceForm({
  onRowAdd,
}: {
  onRowAdd: (row: FormValues, label: string) => void;
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
    const existingData = JSON.parse(localStorage.getItem("LabourtableData") || "[]");
    const updatedData = [...existingData, newData];
    localStorage.setItem("LabourtableData", JSON.stringify(updatedData));
  };

  return (
    <div className="w-full px-4">
      <Formik
        initialValues={initialValues}
        validationSchema={LabourValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSaveToLocalStorage(values);
          onRowAdd(values, "labourService");
          resetForm();
        }}
      >
        {() => (
          <Form className="w-full flex flex-col items-center mb-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InputField label="Approved" name="approved" placeholder="Yes/No" />
              <InputField label="VOC" name="voc" placeholder="VOC details" />
              <InputField label="Detail Job" name="detailJob" placeholder="Job details" />
              <InputField label="FIR" name="fir" placeholder="Yes/No" />
              <InputField label="Remarks" name="remarks" placeholder="Any remarks" />
              <InputField label="Amount" name="amount" type="number" placeholder="Amount" />
            </div>
            <Button  type="submit" text="Add Row" className="self-start text-white mt-4 bg-[#008DD4]" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
