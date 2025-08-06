"use client";
import React from "react";
import Select from "react-select";
import SectionTitle from "@/ChildComponents/SectionTitle";
import { FaSearch } from "react-icons/fa";

function SectionFour() {
  // Hardcoded placeholder options
  const divisionOptions = [
    { value: "dhaka", label: "Dhaka" },
    { value: "chattogram", label: "Chattogram" },
    { value: "rajshahi", label: "Rajshahi" },
  ];

  const districtOptions = [
    { value: "gazipur", label: "Gazipur" },
    { value: "narayanganj", label: "Narayanganj" },
    { value: "manikganj", label: "Manikganj" },
  ];

  const subDistrictOptions = [
    { value: "sreepur", label: "Sreepur" },
    { value: "kaliganj", label: "Kaliganj" },
    { value: "kapasia", label: "Kapasia" },
  ];

  return (
    <div className="my-4 container">
      <SectionTitle title="এলাকার খবর" />
      <div className="row my-3">
        <div className="col-sm-6 col-md-6 col-xl-3 mb-3">
          <label className="form-label">বিভাগ</label>
          <Select options={divisionOptions} placeholder="বিভাগ নির্বাচন করুন" />
        </div>

        <div className="col-sm-6 col-md-6 col-xl-3 mb-3">
          <label className="form-label">জেলা</label>
          <Select options={districtOptions} placeholder="জেলা নির্বাচন করুন" />
        </div>

        <div className="col-sm-6 col-md-6 col-xl-3 mb-3">
          <label className="form-label">উপজেলা</label>
          <Select
            options={subDistrictOptions}
            placeholder="উপজেলা নির্বাচন করুন"
          />
        </div>

        <div className="col-sm-6 col-md-6 col-xl-3 text-center mt-4">
          <button className="search-button d-flex">
            <FaSearch className="text-white mx-2" /> খুঁজুন
          </button>
        </div>
      </div>
    </div>
  );
}

export default SectionFour;
