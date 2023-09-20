import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const AppointmentRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    try {
      const requestedDate = req.query.date;

      if (!requestedDate) {
        res.status(400).json({ error: "Date parameter is missing" });
        return;
      }

      const timeSlots = [];
      let currentHour = 8;
      while (currentHour < 17) {
        const hour = currentHour < 10 ? `0${currentHour}` : `${currentHour}`;
        const startTime = `${requestedDate} ${hour}:00`;
        const endTime = `${requestedDate} ${hour}:59`;

        const existingSlot = await prisma.timeSlot.findFirst({
          where: {
            time: {
              gte: startTime,
              lt: endTime,
            },
          },
        });

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

        currentHour++;
      }

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
