import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import Button from "../Button";
import CustomerVehicleForm from "../form/CustomerVehicleFrom";
import "@/app/globals.css";

interface CustomerVehicleInfo {
  make: string;
  variant: string;
  regNo: string;
  color: string;
  engineNo: string;
  chassisNo: string;
  mileage: string;
}

const columns: ColumnDef<CustomerVehicleInfo>[] = [
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

export default function CustomerVehicleInfoTable({
  rowData,
}: {
  rowData: CustomerVehicleInfo[];
}) {
  const [data, setData] = useState<CustomerVehicleInfo[]>(rowData || []);
  const [hide, setHide] = useState(false);

  const toggleForm = () => setHide(!hide);

  const onRowAdd = (row: CustomerVehicleInfo) => {
    const updatedData = [...data, row];
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const loadDataFromLocalStorage = () => {
    const storedData = JSON.parse(
      localStorage.getItem("tableData") || "[]"
    ) as CustomerVehicleInfo[];
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
      <h1 className="text-2xl font-bold mb-4">Customer Vehicle Info</h1>

      <div className="w-full overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-600 text-white">
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
                  text={hide ? "Hide Form" : "Show Form"}
                  className="mb-2"
                />
                {hide && (
                  <div className="w-full mt-4">
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
      </div>

      <Button
        className="no-print self-start mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={clearData}
        text="Reset Data"
      />
    </div>
  );
}
