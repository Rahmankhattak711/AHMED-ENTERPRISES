"use client";

import React, { useEffect, useState } from "react";

interface RowData {
  amount?: number;
  finalPrice?: number;
}

interface SummaryTableProps {
  labourData?: RowData[];
  subletData?: RowData[];
}

export default function SummaryTable({
  labourData = [],
  subletData = [],
}: SummaryTableProps) {
  const [data, setData] = useState<RowData[]>([]);

  useEffect(() => {
    const storedLabourData = localStorage.getItem("LabourtableData");
    const storedSubletData = localStorage.getItem("subletableData");

    if (storedLabourData && storedSubletData) {
      const combinedData: RowData[] = [
        ...JSON.parse(storedLabourData),
        ...JSON.parse(storedSubletData),
      ];
      setData(combinedData);
    } else if (storedLabourData) {
      setData(JSON.parse(storedLabourData));
    } else if (storedSubletData) {
      setData(JSON.parse(storedSubletData));
    }
  }, [data]);

  const calculateTotalAmount = (data: RowData[]) => {
    return (data || []).reduce(
      (total, row) => total + (row.amount || row.finalPrice || 0),
      0
    );
  };

  const labourAmount = calculateTotalAmount(labourData);
  const subletAmount = calculateTotalAmount(subletData);

  const subtotal = labourAmount + subletAmount;
  const salesTax = subtotal * 0.15;
  const holdingTax = subtotal * 0.18;
  const totalWithTax = subtotal + salesTax + holdingTax;

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs md:text-sm">
              Description
            </th>
            <th className="px-4 py-3 text-right text-xs md:text-sm">Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td className="p-3 text-xs md:text-sm border-b border-gray-200">
              Labour Amount
            </td>
            <td className="p-3 text-right text-xs md:text-sm border-b border-gray-200">
              {labourAmount.toFixed(2)}
            </td>
          </tr> */}
          {/* <tr>
            <td className="p-3 text-xs md:text-sm border-b border-gray-200">
              Sublet Amount
            </td>
            <td className="p-3 text-right text-xs md:text-sm border-b border-gray-200">
              {subletAmount.toFixed(2)}
            </td>
          </tr> */}
          <tr className="font-bold bg-gray-100">
            <td className="p-3 ">Amount</td>
            <td className="p-3 text-right">{subtotal.toFixed(2)}</td>
          </tr>
          <tr className="font-bold bg-gray-100">
            <td className="p-3 ">Sales Tax (15%)</td>
            <td className="p-3 text-right">{salesTax.toFixed(2)}</td>
          </tr>
          <tr className="font-bold bg-gray-100">
            <td className="p-3 ">Tax Holding (18%)</td>
            <td className="p-3 text-right">{holdingTax.toFixed(2)}</td>
          </tr>
          <tr className="font-bold bg-gray-200">
            <td className="p-3 ">Total Amount (After Taxes)</td>
            <td className="p-3 text-right">{totalWithTax.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
