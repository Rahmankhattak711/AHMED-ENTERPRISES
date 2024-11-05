"use client";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import LabourServicesTable from "@/app/component/table/LabourServicesTable";
import SubletServicesTable from "@/app/component/table/SubletServicesTable";
import SummaryTable from "@/app/component/table/SummaryTable";
import Button from "./component/Button";
import Header from "./component/Header";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [labourData, setLabourData] = useState([]);
  const [subletData, setSubletData] = useState([]);

  useEffect(() => {
    const storedLabourData = JSON.parse(localStorage.getItem("tableData") || "[]");
    setLabourData(storedLabourData);

    const storedSubletData = JSON.parse(localStorage.getItem("subletTableData") || "[]");
    setSubletData(storedSubletData);
  }, []);

  const handleLabourDataUpdate = (newData:any) => {
    setLabourData(newData);
    localStorage.setItem("tableData", JSON.stringify(newData)); 
  };

  const handleSubletDataUpdate = (newData:any) => {
    setSubletData(newData);
    localStorage.setItem("subletTableData", JSON.stringify(newData));
  };

  return (
    <div className="w-full flex-col flex items-center text-left ">
      <div className="w-[90%]">
        <div ref={contentRef}>
          <Header />
          <LabourServicesTable rowData={labourData} onUpdate={handleLabourDataUpdate} />
          <SubletServicesTable rowData={subletData} onUpdate={handleSubletDataUpdate} />
          <SummaryTable labourData={labourData} subletData={subletData} />
        </div>
        <Button onClick={reactToPrintFn} text="Print Docs" />
      </div>
    </div>
  );
}
