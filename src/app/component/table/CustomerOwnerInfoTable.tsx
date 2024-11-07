import React, { useEffect, useState } from "react";
import Button from "../Button";
import "@/app/globals.css";
import CustomerOwnerForm from "../form/CustomerOwnerInfoForm";

interface CustomerOwnerInfo {
  userName: string;
  userMobile: string;
  userEmail: string;
  address: string;
}

export default function CustomerOwnerInfoTable({
  rowData,
}: {
  rowData: CustomerOwnerInfo[];
}) {
  const [data, setData] = useState(rowData || []);
  const [hide, setHide] = useState(false);

  const toggleForm = () => setHide(!hide);

  const onRowAdd = (row: CustomerOwnerInfo) => {
    const updatedData = [...data, row];
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const loadDataFromLocalStorage = () => {
    const storedData = JSON.parse(
      localStorage.getItem("tableData") || "[]"
    ) as CustomerOwnerInfo[];
    setData(storedData);
  };

  const clearData = () => {
    localStorage.removeItem("tableData");
    setData([]);
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  const LabourCol: { Header: string; accessor: keyof CustomerOwnerInfo }[] = [
    {
      Header: "User Name:",
      accessor: "userName",
    },
    {
      Header: "User Mobile:",
      accessor: "userMobile",
    },
    {
      Header: "User Email:",
      accessor: "userEmail",
    },
    {
      Header: "Address:",
      accessor: "address",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="w-full flex flex-col gap-4 p-4 bg-[#F9F9F9] rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Customer Owner Information</h1>
        <div className="no-print">
          <Button
            onClick={toggleForm}
            text={!hide ? "Show Form" : "Hide Form"}
            // className="mb-2 bg-gray-600 text-white"
            className="mx-2 border-b-4 border-black"
          />
          {hide && <CustomerOwnerForm onRowAdd={onRowAdd} />}
        </div>
        <div className=" ">
          <div className="flex gap-4">
            {/* Header Row */}
            <div className="font-bold">
              {LabourCol.map((column) => (
                <div key={column.accessor}>{column.Header}</div>
              ))}
            </div>

            {/* Data Rows */}
            {data.map((row, index) => (
              <div key={index}>
                {LabourCol.map((column) => (
                  <div key={column.accessor}>{row[column.accessor]}</div>
                ))}
              </div>
            ))}
          </div>

          <Button
            className="no-print mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            onClick={clearData}
            text="Reset Data"
          />
        </div>
      </div>
    </div>
  );
}
