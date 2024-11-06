"use client";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
// import SubletServicesTable from "@/app/component/table/SubletServicesTable";
import SummaryTable from "@/app/component/table/SummaryTable";
import Button from "./component/Button";
import Header from "./component/Header";
import CustomerOwnerInfoTable from "./component/table/CustomerOwnerInfoTable";
import LabourServicesTable from "./component/table/LabourServicesTable";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);


  const reactToPrintFn = useReactToPrint({ contentRef });

  const [labourData, setLabourData] = useState([]);
  const [subletData, setSubletData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const storedLabourData = JSON.parse(localStorage.getItem("LabourtableData") || "[]");
    setLabourData(storedLabourData);

    const storedSubletData = JSON.parse(localStorage.getItem("subletableData") || "[]");
    setSubletData(storedSubletData);


    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-CA");
    setCurrentDate(formattedDate);
  }, [labourData, subletData]);

  return (
    <div className="w-full flex-col flex items-center text-left ">
      <div className="w-[90%]">
        <div ref={contentRef}>
          <p className="text-right mx-4 my-4">Date: {currentDate}</p> 
          <Header />
          <CustomerOwnerInfoTable rowData={subletData} />
          <LabourServicesTable rowData={labourData} />
          {/* <SubletServicesTable rowData={subletData} /> */}
          <SummaryTable labourData={labourData} subletData={subletData} />
        </div>
        <Button className="bg-green-500 text-black" onClick={reactToPrintFn} text="Print Docs" />
      </div>
    </div>
  );
}
