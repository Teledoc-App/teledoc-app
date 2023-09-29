"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import HistoryCards from "@/components/HistoryUserCards";

interface specialistProps {
  id: string;
  title: string;
}

interface doctorProps {
  doctor: {
    username: string;
    specialist: specialistProps;
  };
  image: string;
}
interface patientAppointment {
  id: string;
  specialist: specialistProps;
  doctor: doctorProps;
}

const History: React.FC = () => {
  const [appointments, setAppointments] = useState<patientAppointment[]>([]);

  async function fetchHistory() {
    try {
      const response = await axios.get("../../api/users/me");
      if (response.status === 200) {
        const data = response.data;
        setAppointments(data);
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
    //   {appointments.map((appointment) => (
    //     <HistoryCards
    //       key={appointment.id}
    //       id={appointment.id}
    //       specialist={appointment.specialist}
    //       doctor={{
    //         username: appointment.doctor.doctor.username,
    //         specialist: appointment.doctor.doctor.specialist,
    //       }}
    //       image={appointment.doctor.image || "default-image-url"}
    //     />
    //   ))}
    // </div>
    <HistoryCards></HistoryCards>
  );
};

const colors = {
  Pending: "#FFB74D",
  Accepted: "#4FC3F7",
  Done: "#81C784",
  Rejected: "#858585",
};

export default History;
