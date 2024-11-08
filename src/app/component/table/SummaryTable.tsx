"use client";

import React, { useEffect, useState } from "react";

interface RowData {
  amount?: number;
  finalPrice?: number;
  partAmount?: number;
}

interface SummaryTableProps {
  labourData?: RowData[];
  subletData?: RowData[];
  vehiclePart?: RowData[];
}

export default function SummaryTable({
  labourData = [],
  subletData = [],
  vehiclePart = [],
}: SummaryTableProps) {
  const [data, setData] = useState<RowData[]>([]);

  useEffect(() => {
    const storedLabourData = localStorage.getItem("LabourtableData");
    const storedSubletData = localStorage.getItem("subletableData");
    const storedVehiclePartData = localStorage.getItem("vehicleparttableData");

    if (storedLabourData && storedSubletData && storedVehiclePartData) {
      const combinedData: RowData[] = [
        ...JSON.parse(storedLabourData),
        ...JSON.parse(storedSubletData),
        ...JSON.parse(storedVehiclePartData),
      ];
      setData(combinedData);
    } else if (storedLabourData) {
      setData(JSON.parse(storedLabourData));
    } else if (storedSubletData) {
      setData(JSON.parse(storedSubletData));
    } else if (storedVehiclePartData) {
      setData(JSON.parse(storedVehiclePartData));
    }
  }, [data]);

  const calculateTotalAmount = (data: RowData[]) => {
    return (data || []).reduce(
      (total, row) =>
        total + (row.amount || row.finalPrice || row.partAmount || 0),
      0
    );
  };

  const labourAmount = calculateTotalAmount(labourData);
  const subletAmount = calculateTotalAmount(subletData);
  const vehiclePartAmount = calculateTotalAmount(vehiclePart);

  const subtotal = labourAmount + subletAmount + vehiclePartAmount;
  const salesTax = subtotal * 0.15;
  const holdingTax = subtotal * 0.18;
  const totalWithTax = subtotal + salesTax + holdingTax;

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="w-full flex flex-col gap-4 p-4 bg-[#F9F9F9] rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <thead className="bg-[#008DDC] text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs md:text-sm">
              Description
            </th>
            <th className="px-4 py-3 text-right text-xs md:text-sm">Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className="font-bold bg-gray-100">
            <td className="p-3 ">Vehicle Parts </td>
            <td className="p-3 text-right">{vehiclePartAmount.toFixed(2)}</td>
          </tr> */}
          <tr className="font-bold bg-gray-100">
            <td className="p-3 ">Amount</td>
            <td className="p-3 text-right">{subtotal.toFixed(2)}</td>
          </tr>
          <tr className="font-bold bg-gray-100">
            <td className="p-3 ">GST (15%)</td>
            <td className="p-3 text-right">{salesTax.toFixed(2)}</td>
          </tr>
          <tr className="font-bold bg-gray-100">
            <td className="p-3 ">WithHolding Tax (18%)</td>
            <td className="p-3 text-right">{holdingTax.toFixed(2)}</td>
          </tr>
          <tr className="font-bold bg-gray-200">
            <td className="p-3 ">Total Amount (After Taxes)</td>
            <td className="p-3 text-right">{totalWithTax.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}
