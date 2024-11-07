import { Formik, Form } from "formik";
import React from "react";
import Button from "../Button";
import InputField from "./InputFailed";
import { VehiclePartsValidation } from "./validation/VehiclePartsValidation";

export interface FormValues {
  partNo: string;
  partName: string;
  unitPrice: string;
  qty: string;
  partAmount: string;
}

export default function VehiclePartsForm({
  onRowAdd,
}: {
  onRowAdd: (row: FormValues, label: string) => void;
}) {
  const initialValues: FormValues = {
    partNo: "", 
    partName: "",
    unitPrice: "",
    qty: "",
    partAmount: "",
  };

  const handleSaveToLocalStorage = (newData: FormValues) => {
    const existingData = JSON.parse(localStorage.getItem("vehicleparttableData") || "[]");
    const updatedData = [...existingData, newData];
    localStorage.setItem("vehicleparttableData", JSON.stringify(updatedData));
  };

  return (
    <div className="w-full px-4">
      <Formik
        initialValues={initialValues}
        validationSchema={VehiclePartsValidation}
        onSubmit={(values, { resetForm }) => {
          handleSaveToLocalStorage(values);
          onRowAdd(values, "vehiclePart");
          resetForm();
        }}
      >
        {() => (
          <Form className="w-full flex flex-col items-center mb-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <InputField label="Part No" name="partNo" placeholder="Part No" />
              <InputField label="Part Name" name="partName" placeholder="Part Name" />
              <InputField label="Unit Price" name="unitPrice" placeholder="Unit Price" />
              <InputField label="Quantity" name="qty" placeholder="Quantity" />
              <InputField label="Amount" name="partAmount" type="number" placeholder="Amount" />
            </div>
            <Button type="submit" text="Add Row" className="self-start mt-4 text-white bg-[#008BDA]" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
