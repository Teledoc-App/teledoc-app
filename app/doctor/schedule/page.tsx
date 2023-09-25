"use client";

import { useState } from "react";
import axios from "axios";

export default function SchedulePage() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e: any) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(handleSubmit);

    try {
      const response = await axios.post("/api/appointment", { date, time });

      if (response.status === 201) {
        console.log("Schedule created successfully.");
      } else {
        console.error("Error creating schedule:", response.data.message);
      }
    } catch (error) {
      console.error("Network/server error:", error);
    }
  };

  return (
    <div>
      <h1>Schedule Page for Doctors</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>
        <div>
          <label>Working Hours:</label>
          <input
            type="text"
            value={time}
            onChange={handleTimeChange}
            required
          />
        </div>
        <div>
          <button type="submit">Schedule</button>
        </div>
      </form>
    </div>
  );
}
