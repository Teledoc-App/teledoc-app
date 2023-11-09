"use client"
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";

interface Notification {
  id: string;
  createdAt: Date;
  senderNotification: {
    name: string;
    image: string;
  };
  appointment: {
    date: Date;
    time: string;
    status: {
      name: string;
    }
  }
}
export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);

  const formattedTime = (timestamp: Date) => {
    const date = new Date(timestamp);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Convert to 12-hour format
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Handle midnight (0) as 12

    // Pad single-digit minutes with a leading zero
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

    return formattedTime;
  };

  const formattedDate = (timestamp: Date) => {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  
  const fetchNotifications = async () => {
    const response = await axios.get("../../api/notification");
    return response.data.notification;
  };

  const { data: notifications } = useSWR(
    "../../api/notification",
    fetchNotifications,
    {
      refreshInterval: 1000, // 1000 milliseconds = 1 second
    }
  );

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);
  return (
    <>
      {/* BELL BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative ml-auto rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        <div className="items-center justify-center absolute -top-1 right-0 w-[10px] h-[10px] bg-[#ff5757] text-white text-[10px] rounded-full"></div>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={`w-screen fixed top-0 left-0 flex items-center justify-center px-2 mt-28`}
      >
        <Dialog.Panel className="bg-white overflow-hidden rounded-lg w-full max-w-[425px] top-5 left-5 shadow-lg">
          {/* TITLE */}
          <div className="bg-[#ff5757] h-[50px] p-4">
            <h3 className="text-white font-bold text-[16px]">Notifications</h3>
          </div>

          {/* NOTIFICATIONS CONTAINER */}
          <div className="w-full flex flex-col overflow-y-scroll max-h-[265px]">
            { notifications?.map((notification: Notification) => (
              <div
                key={notification.id}
                className="flex w-full gap-4 p-4 border-b"
              >
                <div className="bg-[#d9d9d9] w-[40px] h-[40px] rounded-full overflow-hidden">
                  <Image src={notification.senderNotification.image} alt="" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[16px] ">
                    {notification.senderNotification.name}
                  </span>
                  <p className="text-black text-[14px]">
                    has {notification.appointment.status.name} your appointment{" "}
                    <br /> at {formattedDate(notification.appointment.date)}{" "}
                    {notification.appointment.time}
                  </p>
                  <p className="text-[#858585] text-[12px]">
                    {formattedTime(notification.createdAt)} -{" "}
                    {formattedDate(notification.createdAt)}
                  </p>
                </div>
              </div>
            )) }
          </div>
          {/* FOOTER */}
          <div className="flex items-center justify-center w-full p-4">
            {/* <button className="text-[#ff5757]">Clear Notifications</button> */}
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
