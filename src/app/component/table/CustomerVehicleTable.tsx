"use client";
import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import Button from "../Button";
import { CustomerVehicleInfo } from "./TableColumns";
import CustomerVehicleForm from "../form/CustomerVehicleFrom";
import "@/app/globals.css";

export default function CustomerVehicleInfoTable({ rowData }: any) {
  const [data, setData] = useState(rowData || []);
  const [hide, setHide] = useState(false); 
  const toggleForm = () => setHide(!hide);

  const onRowAdd = (row: any) => {
    const updatedData = [...data, row];
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const loadDataFromLocalStorage = () => {
    const storedData = JSON.parse(localStorage.getItem("tableData") || "[]");
    setData(storedData);
  };

  const clearData = () => {
    localStorage.removeItem("tableData");
    setData([]);
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  const table = useReactTable({
    data,
    columns: CustomerVehicleInfo,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Vehicle Info</h1>
      
      <div className="w-full overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-xs md:text-sm">
                    {header.isPlaceholder ? null : header.column.columnDef.header()}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          
          <tbody>
          <tr className="no-print">
              <td colSpan={table.getAllColumns().length} >
                <Button onClick={toggleForm} text={hide ? "Hide Form" : "Show Form"} className="mb-2" />
                {hide && (
                  <div className="w-full mt-4">
                    <CustomerVehicleForm onRowAdd={onRowAdd} />
                  </div>
                )}
              </td>
            </tr>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr key={row.id} className={`${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-xs md:text-sm border-b border-gray-200">
                    {cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        className="no-print self-start mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={clearData}
        text="Reset Data"
      />
    </div>
  );
}
