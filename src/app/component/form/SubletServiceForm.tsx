import { Formik, Form } from "formik";
import React from "react";
import Button from "../Button";
import InputField from "./InputFailed";
import { SubletValidationSchema } from "./validation/SubletValidation";

export interface FormValues {
  approved: string;
  voc: string;
  estPrice: string;
  fir: string;
  remarks: string;
  finalPrice: string;
}

export default function SubletServiceForm({
  onRowAdd,
}: {
  onRowAdd: (row: FormValues, label: string) => void;
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
    const existingData = JSON.parse(
      localStorage.getItem("subletableData") || "[]"
    );
    const updatedData = [...existingData, newData];
    localStorage.setItem("subletableData", JSON.stringify(updatedData));
  };

  return (
    <div className="w-full px-4">
      <Formik
        initialValues={initialValues}
        validationSchema={SubletValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSaveToLocalStorage(values);
          onRowAdd(values, "subletService");
          resetForm();
        }}
      >
        {() => (
          <Form className="w-full flex flex-col items-center mb-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InputField
                label="Approved"
                name="approved"
                placeholder="Yes/No"
              />
              <InputField label="VOC" name="voc" placeholder="VOC details" />
              <InputField
                label="Remarks"
                name="remarks"
                placeholder="Any remarks"
              />
              <InputField label="Fir" name="fir" placeholder="Yes/No" />
              <InputField
                label="Est Price"
                name="estPrice"
                type="number"
                placeholder="Estimated Price"
              />
              <InputField
                label="Final Price"
                name="finalPrice"
                type="number"
                placeholder="Final Price"
              />
            </div>
            <Button type="submit" text="Add Row" className="mt-4" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
