import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="w-full h-auto flex flex-col items-center mt-4 p-2 md:p-2">
      <div className="w-full flex flex-col items-center md:flex-row md:justify-between">
        {/* Left logo */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <Image
            src="/images/logo.png"
            alt="Toyota logo"
            height={80}
            width={80}
            className="w-20 md:w-20 rounded-full"
          />
        </div>

        {/* Center Text */}
        <div className="text-center text-gray-500 text-xs md:text-sm flex-1 px-2">
          <h1 className="font-extrabold text-lg md:text-2xl text-[#2E2F93]">
            AHMED ENTERPRISES
          </h1>
          <p>
            <span className="font-bold">Address :</span> G-9 Institute of
            Engineering Building Near Serena Hotel Zarghoon Road, Quetta
          </p>
          <p>
            <span className="font-bold">Email:</span> affinity.u@gmail.com
          </p>
          <p>
            <span className="font-bold">Phone Number :</span> 0333-7800017
          </p>
        </div>

        {/* Right logo, hidden on small screens */}
        <div className="hidden md:flex justify-center w-full md:w-auto">
          <Image
            src="/images/logo.png"
            alt="Toyota logo"
            height={80}
            width={80}
            className="w-20 md:w-20 rounded-full"
          />
        </div>
      </div>

      {/* Repair info */}
      <div className="w-full text-center md:text-left text-sm mt-4">
        <p className="font-extrabold">
          Estimate : EST-089521 (M) | GENERAL REPAIR
        </p>
        <p className="font-extrabold">Estimate date : 08 Oct 2024</p>
      </div>
    </header>
  );
}
