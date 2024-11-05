import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import Button from "../Button";
import { SubletServiceCol } from "./TableColumns";
import SubletServiceForm from "../form/SubletServiceForm";
import "@/app/globals.css";

interface SubletServiceInfo {
  finalPrice: number;
  remarks: string;
  approved: string;
  voc: string;
  fir: string;
  estPrice: number;
}

export default function SubletServicesTable({
  rowData,
}: {
  rowData: SubletServiceInfo[];
}) {
  const [data, setData] = useState(rowData || []);
  const [hide, setHide] = useState(false);

  const toggleForm = () => setHide(!hide);

  const onRowAdd = (row: SubletServiceInfo) => {
    const updatedData = [...data, row];
    setData(updatedData);
    localStorage.setItem("subletableData", JSON.stringify(updatedData));
  };

  const loadDataFromLocalStorage = () => {
    const storedData = JSON.parse(
      localStorage.getItem("subletableData") || "[]"
    ) as SubletServiceInfo[];
    setData(storedData);
  };

  const clearData = () => {
    localStorage.removeItem("subletableData");
    setData([]);
  };

  const calculateTotalAmount = () => {
    return data.reduce((total, row) => total + parseFloat(row.finalPrice || 0), 0);
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  const table = useReactTable({
    data,
    columns: SubletServiceCol,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Sublet Services</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <thead className="bg-gray-600 text-white ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs md:text-sm"
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header()}
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
                  className="mb-2"
                />
                {hide && (
                  <div className="w-full mt-4">
                    <SubletServiceForm onRowAdd={onRowAdd} />
                  </div>
                )}
              </td>
            </tr>

            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="even:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 text-xs md:text-sm border-b border-gray-200"
                  >
                    {cell.getValue()}
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
                {calculateTotalAmount().toFixed()}
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
