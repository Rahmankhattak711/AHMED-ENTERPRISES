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

  const [hide] = useState(true);
  const [labourData, setLabourData] = useState([]);
  const [subletData, setSubletData] = useState([]);
  const [vehiclePartData, setVehiclePartData] = useState([]);
  const [customerVehicleData, setCustomerVehicleData] = useState([]);
  const [customerOwnerData, setCustomerOwnerData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCustomerOwnerData = JSON.parse(
        localStorage.getItem("CustomerOwnerData") || "[]"
      );
      setCustomerOwnerData(storedCustomerOwnerData);

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
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-CA");
    setCurrentDate(formattedDate);
  }, [ labourData, subletData, vehiclePartData, customerVehicleData, customerOwnerData]);

  const hasData = (key : string) => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem(key);
      return storedData && JSON.parse(storedData).length > 0;
    }
    return false;
  };

  return (
    <div className="w-full flex-col flex items-center text-left">
      <div className="w-[90%]">
        <div ref={contentRef}>
          <p className="text-right mx-4 my-4">Date: {currentDate}</p>
          <Header />
          {/* Customer owner */}
          {hide && hasData("CustomerOwnerData") ? (
            <CustomerOwnerInfoTable rowData={customerOwnerData} />
          ) : (
            <div className="no-print">
              <CustomerOwnerInfoTable rowData={customerOwnerData} />
            </div>
          )}
          {/* Customer vehicle table */}
          {hide && hasData("VehicleCustomerCarData") ? (
            <CustomerVehicleTable rowData={customerVehicleData} />
          ) : (
            <div className="no-print">
              <CustomerVehicleTable rowData={customerVehicleData} />
            </div>
          )}
          {/* Labour */}
          {hide && hasData("LabourtableData") ? (
            <LabourServicesTable rowData={labourData} />
          ) : (
            <div className="no-print">
              <LabourServicesTable rowData={labourData} />
            </div>
          )}
          {/* Sublet */}
          {hide && hasData("subletableData") ? (
            <SubletServicesTable rowData={subletData} />
          ) : (
            <div className="no-print">
              <SubletServicesTable rowData={subletData} />
            </div>
          )}
          {/* Vehicle parts */}
          {hide && hasData("vehicleparttableData") ? (
            <VehiclePartsTable rowData={vehiclePartData} />
          ) : (
            <div className="no-print">
              <VehiclePartsTable rowData={vehiclePartData} />
            </div>
          )}
          <SummaryTable
            labourData={labourData}
            subletData={subletData}
            vehiclePart={vehiclePartData}
          />
        </div>
        <Button
          className="bg-[#1574E7] mx-4 text-white"
          onClick={reactToPrintFn}
          text="Print Docs"
        />
      </div>
    </div>
  );
}
