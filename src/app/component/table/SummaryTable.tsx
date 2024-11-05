"use client"; // Ensure this component is treated as a client component

import React, { useEffect, useState } from "react";

export default function SummaryTable({ labourData = [], subletData = [], rowData }: any) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const onRowAdd = (row: any) => {
    const updatedData:any = [...data, row];
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const calculateTotalAmount = (data:any) => {
    return (data || []).reduce((total:any, row:any) => total + parseFloat(row.amount || 0), 0);
  };

  const calculateTotalFinalPrice = (data:any) => {
    return (data || []).reduce((total:any, row:any) => total + parseFloat(row.finalPrice || 0), 0);
  };

  const labourAmount = calculateTotalAmount(labourData);
  const labourFinalPrice = calculateTotalFinalPrice(labourData);
  const subletAmount = calculateTotalAmount(subletData);
  const subletFinalPrice = calculateTotalFinalPrice(subletData);

  const subtotal = labourAmount + labourFinalPrice + subletAmount + subletFinalPrice;
  const salesTax = subtotal * 0.15;
  const totalWithTax = subtotal + salesTax;

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs md:text-sm">Description</th>
            <th className="px-4 py-3 text-right text-xs md:text-sm">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 text-xs md:text-sm border-b border-gray-200">Labour Amount</td>
            <td className="p-3 text-right text-xs md:text-sm border-b border-gray-200">{labourAmount.toFixed()}</td>
          </tr>
          <tr>
            <td className="p-3 text-xs md:text-sm border-b border-gray-200">Labour Final Price</td>
            <td className="p-3 text-right text-xs md:text-sm border-b border-gray-200">{labourFinalPrice.toFixed()}</td>
          </tr>
          <tr className="font-bold bg-gray-100">
            <td className="p-3 ">Labours & sublets</td>
            <td className="p-3 text-right">{subtotal.toFixed()}</td>
          </tr>
          <tr className="font-bold bg-gray-100">
            <td className="p-3 ">Sales Tax (15%)</td>
            <td className="p-3 text-right">{salesTax.toFixed()}</td>
          </tr>
          <tr className="font-bold bg-gray-200">
            <td className="p-3 ">Total</td>
            <td className="p-3 text-right">{totalWithTax.toFixed()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
