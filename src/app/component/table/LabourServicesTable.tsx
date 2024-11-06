"use client";
import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import Button from "../Button";
import LabourServiceForm, { FormValues } from "../form/LabourServiceForm";
import "@/app/globals.css";

interface LabourServiceInfo {
  approved: string;
  voc: string;
  remarks: string;
  detailJob: string;
  fir: string;
  amount: number;
}

const LabourCol = [
  {
    header: "Approved",
    accessorKey: "approved",
  },
  {
    header: "VOC",
    accessorKey: "voc",
  },
  {
    header: "Remarks",
    accessorKey: "remarks",
  },
  {
    header: "Detail Job",
    accessorKey: "detailJob",
  },
  {
    header: "FIR",
    accessorKey: "fir",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
];

export default function LabourServicesTable({
  rowData,
}: {
  rowData: LabourServiceInfo[];
}) {
  const [data, setData] = useState(rowData || []);
  const [hide, setHide] = useState(false);

  const toggleForm = () => setHide(!hide);

  const onRowAdd = (row: FormValues) => {
    const updatedData = [
      ...data,
      { ...row, amount: parseFloat(row.amount) },
    ];
    setData(updatedData);
    localStorage.setItem("LabourtableData", JSON.stringify(updatedData));
  };

  const loadDataFromLocalStorage = () => {
    const storedData = JSON.parse(
      localStorage.getItem("LabourtableData") || "[]"
    ) as LabourServiceInfo[];
    setData(storedData);
  };

  const clearData = () => {
    localStorage.removeItem("LabourtableData");
    setData([]);
  };

  const calculateTotalAmount = () => {
    return data.reduce((total, row) => total + (row.amount || 0), 0);
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  const table = useReactTable({
    data,
    columns: LabourCol,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gray-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs md:text-sm"
                  >
                    {header.isPlaceholder
                      ? null
                      : typeof header.column.columnDef.header === "function"
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header || ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            <tr className="no-print">
              <td colSpan={table.getAllColumns().length}>
                <Button
                  
                  onClick={toggleForm}
                  text={hide ? "Hide Form" : "Show Form"}
                    className="border-[1px] rounded-md border-gray-600 text-black bg-gray-500"
                />
                {hide && (
                  <div className="w-full">
                    <LabourServiceForm onRowAdd={onRowAdd} />
                  </div>
                )}
              </td>
            </tr>

            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-gray-50">
               {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-xs md:text-sm border-b border-gray-200"
                  >
                    {String(cell.getValue())}
                  </td>
                ))}
              </tr>
            ))}

            <tr className="font-bold bg-gray-100">
              <td
                colSpan={table.getAllColumns().length - 1}
                className="p-3 text-right"
              >
                Total Amount:
              </td>
              <td className="p-3 border-t border-gray-200 text-right">
                {calculateTotalAmount().toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <Button
          className="no-print mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={clearData}
          text="Reset Data"
        />
      </div>
    </div>
  );
}
