import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import Button from "../Button";
import SubletServiceForm, { FormValues } from "../form/SubletServiceForm";
import "@/app/globals.css";

interface SubletServiceInfo {
  approved: string;
  voc: string;
  remarks: string;
  fir: string;
  estPrice: string;
  finalPrice: number;
}

const SubletServiceCol = [
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
    header: "Fir",
    accessorKey: "fir",
  },
  {
    header: "Est. Price",
    accessorKey: "estPrice",
  },
  {
    header: "Final Price",
    accessorKey: "finalPrice",
  },
];

export default function SubletServicesTable({
  rowData,
}: {
  rowData: SubletServiceInfo[];
}) {
  const [data, setData] = useState(rowData || []);
  const [hide, setHide] = useState(false);

  const toggleForm = () => setHide(!hide);
 
  const onRowAdd = (row: FormValues) => {
    const updatedData = [
      ...data,
      { ...row, finalPrice: parseFloat(row.finalPrice) },
    ];
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
    return data.reduce((total, row) => total + (row.finalPrice || 0), 0);
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
      <div className="w-full flex flex-col gap-4 p-4 bg-[#F9F9F9] rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sublet Services</h1>
        <table className="w-full bg-white shadow-lg overflow-hidden border border-gray-200">
        <thead className="bg-[#008DDC] text-white">
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
                  // className="mb-2 bg-gray-600 text-white"
                     className="my-2 mx-2 border-b-4 border-black"
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
                {calculateTotalAmount().toFixed()}
              </td>
            </tr>
          </tbody>
        </table>

        <Button
          className="no-print w-36 mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={clearData}
          text="Reset Data"
        />
      </div>
    </div>
  );
}
