import React from "react";

export default function SajidUllah() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-8 max-w-screen-md mx-auto text-gray-900">
      {/* Print Button */}
      <div className="text-right mb-4">
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Print
        </button>
      </div>

      {/* Personal Info */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold border-b-2 pb-2 mb-4">
          Personal Information
        </h1>
        <p>
          <span className="font-semibold">Full Name:</span> Sajid Ullah
        </p>
        <p>
          <span className="font-semibold">Date of Birth:</span> 08-09-1996
        </p>
        <p>
          <span className="font-semibold">Marital Status:</span> Single
        </p>
        <p>
          <span className="font-semibold">Email Address:</span>{" "}
          sajidullah@gmail.com
        </p>
        <p>
          <span className="font-semibold">
            Mobile Numbers Used in Last 5 Years:
          </span>{" "}
          097431336337, 097450156609
        </p>
        <p>
          <span className="font-semibold">Pakistan ID No:</span> 14102-0370157-5
        </p>
        <p>
          <span className="font-semibold">Qatar ID No:</span> 29658603188
        </p>
      </section>

      {/* Home Address */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold border-b-2 pb-2 mb-4">
          Home Address
        </h1>
        <p>
          <span className="font-semibold">District:</span> Hangu
        </p>
        <p>
          <span className="font-semibold">Tassil:</span> Thall
        </p>
        <p>
          <span className="font-semibold">Village:</span> Dallan, Lahori banda
        </p>
        <p>
          <span className="font-semibold">Province:</span> KPK
        </p>
        <p>
          <span className="font-semibold">Postal Zone/ZIP Code:</span> 26190
        </p>
        <p>
          <span className="font-semibold">Country:</span> Pakistan
        </p>
      </section>

      {/* Current Address */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold border-b-2 pb-2 mb-4">
          Current Address
        </h1>
        <p>
          <span className="font-semibold">City:</span> Doha
        </p>
        <p>
          <span className="font-semibold">Postal Zone/ZIP Code:</span> 122104
        </p>
        <p>
          <span className="font-semibold">Country:</span> Qatar
        </p>
        <p>
          <span className="font-semibold">Primary Phone Number:</span>{" "}
          097431336337
        </p>
        <p>
          <span className="font-semibold">Secondary Phone Number:</span>{" "}
          097450156609
        </p>
      </section>

      {/* Work Information */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold border-b-2 pb-2 mb-4">
          Work/Education/Training Information
        </h1>
        <p>
          <span className="font-semibold">Primary Occupation:</span> Driving
        </p>
        <p>
          <span className="font-semibold">Start Date:</span> 01-12-2018
        </p>
        <p>
          <span className="font-semibold">Company/Business Name:</span> AL BAD
          AL KHAIBAR CARGO SERVICE
        </p>
        <p>
          <span className="font-semibold">Address:</span> Doha, Mughalina
        </p>
        <p>
          <span className="font-semibold">Monthly Salary:</span> 13500 Qatari
          Riyal
        </p>
        <p>
          <span className="font-semibold">Briefly Describe Your Duties:</span> I
          have been working as a professional driver in Qatar for the past five
          years. My duties include safely transporting passengers and goods,
          following all traffic regulations, maintaining vehicle cleanliness,
          and ensuring timely arrivals. I am familiar with Qatar's road network
          and committed to delivering excellent customer service and maintaining
          a high standard of driving etiquette.
        </p>
      </section>

      {/* Family Information */}
      <section className="mb-8">
  <h1 className="text-2xl font-bold border-b-2 pb-2 mb-4">Family Information</h1>
  
  <p>
    <span className="font-semibold">Father's Name:</span> Andaz Gull
  </p>
  <p>
    <span className="font-semibold">Father's Date of Birth:</span> 1958
  </p>
  <p>
    <span className="font-semibold">Mother's Name:</span> Laghl Bat Khala
  </p>
  <p>
    <span className="font-semibold">Mother's Date of Birth:</span> 01-01-1960
  </p>
  <p>
    <span className="font-semibold">Spouse's Full Name:</span> Laghl Bat Khala
  </p>
  <p>
    <span className="font-semibold">Spouse's Date of Birth:</span> 01-01-1960
  </p>
  <p>
    <span className="font-semibold">Spouse's City and Country of Birth:</span> Pakistan
  </p>
  <p>
    <span className="font-semibold">Children Names and Dates of Birth:</span> 
    <br />
    First Brother Name: Muhammad Amin Jan, Date of Birth: 1976; 
    <br />
    Second Sister Name: Shaukat Bi Bi, Date of Birth: 01-01-1980;
    <br />
    Third Brother Name : Abdul Qadar, Date of Birth: 07-04-1990;
    <br />
    Fourth Brother Name: Fayaz Ud Din, Date of Birth: 12-04-1991;
  </p>
</section>


      {/* Travel History */}
      <section className="mb-8">
        <h1 className="text-2xl font-bold border-b-2 pb-2 mb-4">
          Travel History
        </h1>
        <p>
          <span className="font-semibold">Dates of all travel:</span> 21-02-2018
        </p>
        <p>
          <span className="font-semibold">Monthly Salary or Income:</span> 13500
          Qatari Riyal
        </p>
        <p>
          <span className="font-semibold">Duties:</span> I have been working as
          a professional driver in Qatar for the past five years. My duties
          include safely transporting passengers and goods, following all
          traffic regulations, maintaining vehicle cleanliness, and ensuring
          timely arrivals.
        </p>
      </section>
    </div>
  );
}
