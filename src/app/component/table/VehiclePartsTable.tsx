"use client";
import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import Button from "../Button";
import "@/app/globals.css";
import VehiclePartsForm,{ FormValues } from "../form/VehiclePartsForm";

interface VehiclePartsTableProps {
  partNo: string;
  partName: string;
  unitPrice: string;
  qty: string;
  partAmount: number;
}

const LabourCol = [
  {
    header: "Part No",
    accessorKey: "partNo",
  },
  {
    header: "Part Name",
    accessorKey: "partName",
  },
  {
    header: "Unit Price",
    accessorKey: "unitPrice",
  },
  {
    header: "Quantity",
    accessorKey: "qty",
  },
  {
    header: "Amount",
    accessorKey: "partAmount",
  },
];

export default function VehiclePartsTable({
  rowData,
}: {
  rowData: VehiclePartsTableProps[];
}) {
  const [data, setData] = useState(rowData || []);
  const [hide, setHide] = useState(false);

  const toggleForm = () => setHide(!hide);

  const onRowAdd = (row: FormValues) => {
    const updatedData = [
      ...data,
      { ...row, partAmount: parseFloat(row.partAmount) },
    ];
    setData(updatedData);
    localStorage.setItem("vehicleparttableData", JSON.stringify(updatedData));
  };

  const loadDataFromLocalStorage = () => {
    const storedData = JSON.parse(
      localStorage.getItem("vehicleparttableData") || "[]"
    ) as VehiclePartsTableProps[];
    setData(storedData);
  };

  const clearData = () => {
    localStorage.removeItem("vehicleparttableData");
    setData([]);
  };

  const calculateTotalAmount = () => {
    return data.reduce((total, row) => total + (row.partAmount || 0), 0);
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
      <h1 className="text-2xl font-bold mb-4">Vehicle Parts</h1>
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
                    <VehiclePartsForm onRowAdd={onRowAdd} />
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
