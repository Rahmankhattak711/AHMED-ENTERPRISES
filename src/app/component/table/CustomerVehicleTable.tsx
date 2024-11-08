import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import Button from "../Button";
import CustomerVehicleForm from "../form/CustomerVehicleFrom";
import "@/app/globals.css";

interface CustomerVehicleTable {
  make: string;
  variant: string;
  regNo: string;
  color: string;
  engineNo: string;
  chassisNo: string;
  mileage: string;
}

const columns: ColumnDef<CustomerVehicleTable>[] = [
  {
    header: "Make",
    accessorKey: "make",
  },
  {
    header: "Variant",
    accessorKey: "variant",
  },
  {
    header: "Registration Number",
    accessorKey: "regNo",
  },
  {
    header: "Color",
    accessorKey: "color",
  },
  {
    header: "Engine Number",
    accessorKey: "engineNo",
  },
  {
    header: "Chassis Number",
    accessorKey: "chassisNo",
  },
  {
    header: "Mileage",
    accessorKey: "mileage",
  },
];

export default function CustomerVehicleTable({
  rowData,
}: {
  rowData: CustomerVehicleTable[];
}) {
  const [data, setData] = useState<CustomerVehicleTable[]>(rowData || []);
  const [hide, setHide] = useState(false);

  const toggleForm = () => setHide(!hide);

  const onRowAdd = (row: CustomerVehicleTable) => {
    const updatedData = [...data, row];
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const loadDataFromLocalStorage = () => {
    const storedData = JSON.parse(
      localStorage.getItem("tableData") || "[]"
    ) as CustomerVehicleTable[];
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
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <div className="w-full flex flex-col gap-4 p-4 bg-[#F9F9F9] rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Customer Vehicle Info</h1>
        <table className="w-full bg-[#F9F9F9]  overflow-hidden">
          <thead className="bg-[#008DDC] text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-3 text-xs md:text-sm">
                    {header.isPlaceholder
                      ? null
                      : typeof header.column.columnDef.header === "function"
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header}
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
                  text={!hide ? "Show Form" : "Hide Form"}
                  className="my-2 mx-2 border-b-4 border-black"
                />
                {hide && (
                  <div className="w-full mt-2">
                    <CustomerVehicleForm onRowAdd={onRowAdd} />
                  </div>
                )}
              </td>
            </tr>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-xs md:text-sm border-b border-gray-200"
                  >
                    {String(cell.getValue())}
                  </td>

                  //  <td key={cell.id} className="px-4 py-3 text-xs md:text-sm border-b border-gray-200">
                  // {cell.getValue() as React.ReactNode}
                  // </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          className="no-print self-start mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={clearData}
          text="Reset Data"
        />
      </div>
    </div>
  );
}
