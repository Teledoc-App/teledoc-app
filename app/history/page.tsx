"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import HistoryCards from "@/components/HistoryUserCards";

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
//   status: specialistProps;
// }

const History: React.FC = () => {
  //   const [history, setHistory] = useState<patientAppointment[]>([]);
  const [history, setHistory] = useState();

  async function fetchHistory() {
    try {
      const response = await axios.get("../../api/users/me");
      if (response.status === 200) {
        const data = response.data[0];
        setHistory(data);
        console.log(data);
      }
    } catch (error) {
      console.log("Error fetching appointment history:", error);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    // <div className="w-full">
    //   {history ? (
    //     history.length > 0 ? (
    //       history.map((appointment) => (
    //         <HistoryCards
    //           key={appointment.id}
    //           id={appointment.id}
    //           specialist={appointment.specialist}
    //           doctor={appointment.doctor}
    //           status={appointment.status}
    //         />
    //       ))
    //     ) : (
    //       <p>No history available.</p>
    //     )
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
    <div>
      <HistoryCards></HistoryCards>
    </div>
  );
};

const colors = {
  Pending: "#FFB74D",
  Accepted: "#4FC3F7",
  Done: "#81C784",
  Rejected: "#858585",
};

export default History;
