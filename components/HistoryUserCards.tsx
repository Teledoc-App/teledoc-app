"use client";
import React from "react";

interface patientAppointment {
  doctor: string;
  username: string;
  status: string;
}

const HistoryCards: React.FC<patientAppointment> = ({
  doctor,
  username,
  status,
}) => {
  const colors = {
    Pending: "#FFB74D",
    Accepted: "#4FC3F7",
    Done: "#81C784",
    Rejected: "#858585",
  };
  // const style = type + " thumb-container";
  return (
    <div className="flex flex-row border border-black rounded-lg w-[377px] h-[123px]">
      <div className="flex flex-col">
        <div className="gambar">gambar</div>
      </div>
      <div className="flex flex-col px-5">
        <div className="gambar">dr.sledge hammer</div>
        <div className="text">dokter gigi</div>
        <div className="text-blue-600">done</div>
      </div>
    </div>
  );
};

export default HistoryCards;
