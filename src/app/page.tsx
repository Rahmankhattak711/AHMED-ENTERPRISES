"use client";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import SummaryTable from "@/app/component/table/SummaryTable";
import Button from "./component/Button";
import Header from "./component/Header";
import CustomerOwnerInfoTable from "./component/table/CustomerOwnerInfoTable";
import LabourServicesTable from "./component/table/LabourServicesTable";
import VehiclePartsTable from "./component/table/VehiclePartsTable";
import SubletServicesTable from "./component/table/SubletServicesTable";
import CustomerVehicleTable from "./component/table/CustomerVehicleTable";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({ contentRef });

  const [labourData, setLabourData] = useState([]);
  const [subletData, setSubletData] = useState([]);
  const [vehiclePartData, setVehiclePartData] = useState([]);
  const [customerVehicleData, setCustomerVehicleData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const storedLabourData = JSON.parse(
      localStorage.getItem("LabourtableData") || "[]"
    );
    setLabourData(storedLabourData);

    const storedSubletData = JSON.parse(
      localStorage.getItem("subletableData") || "[]"
    );
    setSubletData(storedSubletData);

    const vehiclePartsData = JSON.parse(
      localStorage.getItem("vehicleparttableData") || "[]"
    );
    setVehiclePartData(vehiclePartsData);

    const customerVehicleCarData = JSON.parse(
      localStorage.getItem("VehicleCustomerCarData") || "[]"
    );
    setCustomerVehicleData(customerVehicleCarData);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-CA");
    setCurrentDate(formattedDate);
  }, [labourData, subletData, vehiclePartData]);

  return (
    <div className="w-full flex-col flex items-center text-left ">
      <div className="w-[90%]">
        <div ref={contentRef}>
          <p className="text-right mx-4 my-4">Date: {currentDate}</p>
          <Header />
          <CustomerOwnerInfoTable rowData={subletData} />
          <CustomerVehicleTable rowData={customerVehicleData} />
          <LabourServicesTable rowData={labourData} />
          <SubletServicesTable rowData={subletData} />
          <VehiclePartsTable rowData={vehiclePartData} />
          <SummaryTable
            labourData={labourData}
            subletData={subletData}
            vehiclePart={vehiclePartData}
          />
        </div>
        <Button
          className="bg-green-500 text-black"
          onClick={reactToPrintFn}
          text="Print Docs"
        />
      </div>
    </div>
  );
}
