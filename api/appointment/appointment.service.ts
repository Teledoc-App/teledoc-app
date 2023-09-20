import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// prisma di define
const prisma = new PrismaClient();

// nextapi req & res versi next.jsnya http req & res
const AppointmentRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // hanya get method yang di pass untuk request ini
  if (req.method === "GET") {
    try {
      // patient masukin date dd/mm/yyyy
      const requestedDate = req.query.date; // Example: "20/09/2023"

      // kalau datenya ga bener, dia throw error
      if (!requestedDate) {
        res.status(400).json({ error: "Date parameter is missing" });
        return;
      }

      // define timeslots in array buat store dan create timeslots per 1 jam, di mulai dari jam 8 a.m sampai 5 p.m
      const timeSlots = [];
      let currentHour = 8;
      while (currentHour < 17) {
        // define hour jadi 2 angka, jadi untuk 8 a.m jadi 08 a.m
        const hour = currentHour < 10 ? `0${currentHour}` : `${currentHour}`;
        // define starttime dan endtime dari date + time slot, 00 dan 59 membuat full hour. atau bisa 00 & 00 contoh 08.00 - 09.00.
        const startTime = `${requestedDate} ${hour}:00`;
        const endTime = `${requestedDate} ${hour}:59`;

        // dia cek await apakah timeslots di jam tersebut ada
        const existingSlot = await prisma.timeSlot.findFirst({
          where: {
            time: {
              // gte(greater than equal) & lt(less than)
              gte: startTime,
              lt: endTime,
            },
          },
        });

        // kalau tidak ada brrti akan di buat dan di kirimkan di database
        if (!existingSlot) {
          const newSlot = await prisma.timeSlot.create({
            data: {
              time: startTime,
              startedAt: new Date(),
              finishedAt: new Date(),
            },
          });
          timeSlots.push(newSlot);
        }

        // loop dari currenthour: 8 sampai terakhir 17
        currentHour++;
      }

      // status 200 berhasil dan di jalnkan, 500 dan 405 handling error
      res.status(200).json(timeSlots);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default AppointmentRequest;

// Scenario:
// jadi ketika patient memilih doctor, patient memasukan tanggal di mm/dd/yyyy, dan akan di cari di tanggal tersebut untuk time slot
// jika, di tangal tersebut contoh: "20/09/2023" tidak ada appointment, patient bisa memilih jam dari 8 a.m - 17 p.m
// Frontend: jika timeslots available maka button akan terang dan bisa di click
// Frontend: jika timeslots not-availble maka button akan redup dan tidak bisa di click
// sesudah patient klik salah 1 dari jam 8 a.m - 17 p.m, maka sistem akan membuat timeslots baru dan appointment selesai
// haha
