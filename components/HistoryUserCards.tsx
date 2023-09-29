/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

// interface specialistProps {
//   id: string;
//   title: string;
// }

// interface doctorProps {
//   image: string;
//   username: string;
//   specialist: specialistProps;
// }

// interface statusProps {
//   name: string;
// }

// interface patientAppointment {
//   id: string;
//   specialist: specialistProps;
//   doctor: doctorProps;
//   status: statusProps;
// }

const HistoryCards = (props: { appointment: any }) => {
  return (
    <div className="flex justify-center items-center py-2">
      <div className="container flex bg-[#d9d9d9]/30 h-[120px] w-[400px] px-4 rounded-lg border text-gray-400 outline-none">
        <div className="p-2 flex items-center">
          <img
            className="w-20 h-20 rounded-full"
            src={
              "https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"
            }
            alt="Profile picture"
            width={200}
            height={200}
          />
          <div className="px-7">
            <h1 className="text-[#000000] text-xl font-bold">
              {props.appointment}
              {/* {props.appointment.doctor.doctor.username} */}
            </h1>
            {/* <p className="text-[#858585] text-m">{specialist?.title}</p> */}
            <p className="text-[#ff5757] font-bold text-m mt-5">
              {/* {status?.name} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const colors = {
  Pending: "#FFB74D",
  Accepted: "#4FC3F7",
  Done: "#81C784",
  Rejected: "#858585",
};

export default HistoryCards;
