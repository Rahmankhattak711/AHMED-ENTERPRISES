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

  const [hide, setHide] = useState(true);

  const hasVehiclePartData = () => {
    const storedData = localStorage.getItem("vehicleparttableData");
    return storedData && JSON.parse(storedData).length > 0;
  };

  const hasLabourData = () => {
    const storedData = localStorage.getItem("LabourtableData");
    return storedData && JSON.parse(storedData).length > 0;
  };

  const hasSubletData = () => {
    const storedData = localStorage.getItem("subletableData");
    return storedData && JSON.parse(storedData).length > 0;
  };

  const hasCustomerVehicleData = () => {
    const storedData = localStorage.getItem("VehicleCustomerCarData");
    return storedData && JSON.parse(storedData).length > 0;
  };

  const hasCustomerOwnerData = () => {
    const storedData = localStorage.getItem("CustomerOwnerData");
    return storedData && JSON.parse(storedData).length > 0;
  };

  const [labourData, setLabourData] = useState([]);
  const [subletData, setSubletData] = useState([]);
  const [vehiclePartData, setVehiclePartData] = useState([]);
  const [customerVehicleData, setCustomerVehicleData] = useState([]);
  const [customerOwnerData, setCustomerOwnerData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
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

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-CA");
    setCurrentDate(formattedDate);
  }, [labourData, subletData, vehiclePartData, customerVehicleData]);

  return (
    <div className="w-full flex-col flex items-center text-left ">
      <div className="w-[90%]">
        <div ref={contentRef}>
          <p className="text-right mx-4 my-4">Date: {currentDate}</p>
          <Header />
          {/* custormer owner */}
          {hide && hasCustomerOwnerData() ? (
            <CustomerOwnerInfoTable  rowData={customerOwnerData} />
          ) : (
            <div className="no-print">
              <CustomerOwnerInfoTable rowData={customerOwnerData}/>
            </div>
          )}
          {/* // customer Vehcile table */}
          {hide && hasCustomerVehicleData() ? (
            <CustomerVehicleTable rowData={customerVehicleData} />
          ) : (
            <div className="no-print">
              <CustomerVehicleTable rowData={customerVehicleData} />
            </div>
          )}
          {/* labour */}
          {hide && hasLabourData() ? (
            <LabourServicesTable rowData={labourData} />
          ) : (
            <div className="no-print">
              <LabourServicesTable rowData={labourData} />
            </div>
          )}
          {/* // sublet */}
          {hide && hasSubletData() ? (
            <SubletServicesTable rowData={subletData} />
          ) : (
            <div className="no-print">
              <SubletServicesTable rowData={subletData} />
            </div>
          )}
          {/* sublet */}
          {hide && hasVehiclePartData() ? (
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
