// src/components/InstituteDashboard/SellSportsMaterial.jsx
import React, { useState } from "react";

const SellSportsMaterial = () => {
  const [step, setStep] = useState(1);

  /* ---------------- BUSINESS STATE ---------------- */
  const [businessDetails, setBusinessDetails] = useState({
    legalBusinessName: "",
    businessType: "",
    registeredBusinessAddress: "",
    emailBusiness: "",
    panCardNumber: "",
    gstin: "",
    gstinNumber: "",
    authorizedContactPersonName: "",
    mobileNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  /* ---------------- BANK STATE ---------------- */
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    chequeProof: "",
  });

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- STEP-2 SAVE → GO TO STEP-3 ---------------- */
  const handleSave = (e) => {
    e.preventDefault();
    setEditModeStep2(false);   // lock step2 fields
    setStep(3);
  };

  /* ---------------- EDIT MODES ---------------- */
  const [editModeStep2, setEditModeStep2] = useState(true);
  const [editModeStep3, setEditModeStep3] = useState(false);

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 p-2">
        <h1 className="text-2xl font-black text-gray-900">
          {step === 1
            ? "Provide Your Business Details"
            : step === 2
            ? "Bank & Settlement Details (T+2 Settlement)"
            : "Full Business Details"}
        </h1>

        <button className="border border-orange-400 text-orange-600 px-4 py-1 rounded-md text-sm">
          Sell a Product
        </button>
      </div>

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <form onSubmit={handleNext}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="font-semibold text-sm text-black">
                Legal Business Name
              </label>
              <input
                name="legalBusinessName"
                onChange={handleInputChange}
                value={businessDetails.legalBusinessName}
                className="w-full border-2 border-orange-300 rounded h-9 px-3 text-black"
              />
            </div>

            <div>
              <label className="font-semibold text-sm text-black">
                Business Type
              </label>
              <input
                name="businessType"
                onChange={handleInputChange}
                value={businessDetails.businessType}
                className="w-full border-2 border-orange-300 rounded h-9 px-3 text-black"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="font-semibold text-sm text-black">
              Registered Business Address
            </label>
            <input
              name="registeredBusinessAddress"
              onChange={handleInputChange}
              value={businessDetails.registeredBusinessAddress}
              className="w-full border-2 border-orange-300 rounded h-9 px-3 text-black"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="font-semibold text-sm text-black">
                E-mail Id (Business)
              </label>
              <input
                name="emailBusiness"
                onChange={handleInputChange}
                value={businessDetails.emailBusiness}
                className="w-full border-2 border-orange-300 rounded h-9 px-3 text-black"
              />
            </div>

            <div>
              <label className="font-semibold text-sm text-black">
                PAN card number
              </label>
              <input
                name="panCardNumber"
                onChange={handleInputChange}
                value={businessDetails.panCardNumber}
                className="w-full border-2 border-orange-300 rounded h-9 px-3 text-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="font-semibold text-sm text-black">
                GSTIN
              </label>
              <input
                name="gstin"
                onChange={handleInputChange}
                value={businessDetails.gstin}
                className="w-full border-2 border-orange-300 rounded h-9 px-3 text-black"
              />
            </div>

            <div>
              <label className="font-semibold text-sm text-black">
                GSTIN Number (if yes)
              </label>
              <input
                name="gstinNumber"
                onChange={handleInputChange}
                value={businessDetails.gstinNumber}
                className="w-full border-2 border-orange-300 rounded h-9 px-3 text-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="font-semibold text-sm text-black">
                Authorized Contact Person Name
              </label>
              <input
                name="authorizedContactPersonName"
                onChange={handleInputChange}
                value={businessDetails.authorizedContactPersonName}
                className="w-full border-2 border-orange-300 rounded h-9 px-3 text-black"
              />
            </div>

            <div>
              <label className="font-semibold text-sm text-black">
                Mobile Number
              </label>
              <input
                name="mobileNumber"
                onChange={handleInputChange}
                value={businessDetails.mobileNumber}
                className="w-full border-2 border-orange-300 rounded h-9 px-3 text-black"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 text-white px-10 py-2 rounded font-bold text-lg"
            >
              Next
            </button>
          </div>
        </form>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <form onSubmit={handleSave}>
          
          {/* EDIT BUTTON */}
          <div className="flex justify-end mb-2">
            <button
              type="button"
              className="bg-orange-500 text-black px-4 py-1 rounded"
              onClick={() => setEditModeStep2(!editModeStep2)}
            >
              {editModeStep2 ? "Save" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { label: "Bank account holder Name", name: "accountHolder" },
              { label: "Bank Name", name: "bankName" },
              { label: "Account Number", name: "accountNumber" },
              { label: "IFSC Code", name: "ifscCode" },
              { label: "UPI ID (Optional)", name: "upiId" },
              { label: "Cancelled Cheque Or Bank Proof", name: "chequeProof" },
            ].map((item) => (
              <div key={item.name}>
                <label className="font-semibold text-black">{item.label}</label>
                <input
                  disabled={!editModeStep2}
                  name={item.name}
                  onChange={handleBankChange}
                  value={bankDetails[item.name]}
                  className="w-full border-2 border-orange-400 rounded h-9 px-3 text-black"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-2 text-black text-[15px]">
              <input type="checkbox" /> I Agree Commercial Terms
            </label>

            <label className="flex items-center gap-2 text-black text-[15px]">
              <input type="checkbox" /> I Agree Seller Consent & Agreement
            </label>
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-orange-500 text-black px-14 py-2 rounded-xl font-bold text-lg">
              Save
            </button>
          </div>
        </form>
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <div>

          {/* BUSINESS HEADING */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl text-black font-bold">
              Provide Your Business Details
            </h2>

            <button
              onClick={() => setEditModeStep3(!editModeStep3)}
              className="bg-orange-500 text-black px-4 py-1 rounded"
            >
              {editModeStep3 ? "Save" : "Edit"}
            </button>
          </div>

          {/* BUSINESS BOX */}
          <div className="border p-4 bg-gray-50 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.keys(businessDetails).map((key) => (
                <div
                  key={key}
                  className={
                    key === "registeredBusinessAddress" ||
                    key === "authorizedContactPersonName" ||
                    key === "mobileNumber"
                      ? "lg:col-span-2"
                      : ""
                  }
                >
                  <label className="font-semibold text-sm text-black">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    disabled={!editModeStep3}
                    name={key}
                    onChange={handleInputChange}
                    value={businessDetails[key]}
                    className="w-full border-2 border-orange-300 rounded h-9 px-3 text-black"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* BANK HEADING */}
          <h2 className="text-xl text-black font-bold mb-2">
            Bank & Settlement Details (T+2 Settlement)
          </h2>

          {/* BANK BOX */}
          <div className="border p-4 bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.keys(bankDetails).map((key) => (
                <div key={key}>
                  <label className="font-semibold text-sm text-black">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    disabled={!editModeStep3}
                    name={key}
                    onChange={handleBankChange}
                    value={bankDetails[key]}
                    className="w-full border-2 border-orange-400 rounded h-9 px-3 text-black"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-orange-500 text-black px-14 py-2 rounded-xl font-bold text-lg">
              Save
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SellSportsMaterial;
