"use client";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import HistoryCards from "@/components/HistoryUserCards";

interface patientAppointment {
  doctor: string;
  username: string;
  status: string;
}

export default function HistoryUserCards() {
  const [patientAppointment, setpatientAppointment] = useState<
    patientAppointment[]
  >([]);
  const [appointments, setAppointments] = useState();
  const URL = "http://localhost:3000/api/";
  const token =
    "993901663c42b1c2df10edf1674106e3d03618fcf716d975a608c38aa158f95c%7C83526fb2504952b1a4f1c4d20daf2cab3be124226ca7aaa881bdc8f3ce4983c7";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function fetchHistory() {
    try {
      const response = await axios.get(URL + "users/me", config);
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

  return <HistoryCards></HistoryCards>;
}

const colors = {
  Pending: "#FFB74D",
  Accepted: "#4FC3F7",
  Done: "#81C784",
  Rejected: "#858585",
};
